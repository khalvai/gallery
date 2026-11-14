import fs from "node:fs"
import path from "node:path"
import satori from "satori"
import { Resvg } from "@resvg/resvg-js"
import { artworks, notes, type Note } from "../src/data"

const SITE_URL = "https://gallery.khalvai.com"
const DIST_DIR = path.resolve("dist")

const vazirmatnFont = fs.readFileSync(
  "node_modules/@fontsource/vazirmatn/files/vazirmatn-arabic-400-normal.woff",
)
const instrumentSerifFont = fs.readFileSync(
  "node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff",
)

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

function absoluteUrl(url: string) {
  return new URL(url, SITE_URL).toString()
}

function injectMeta(
  html: string,
  {
    title,
    description,
    image,
    url,
    type = "website",
  }: {
    title: string
    description: string
    image: string
    url: string
    type?: string
  },
) {
  const metadata = `
    <title>${escapeHtml(title)} | Khalvai Gallery</title>
    <meta name="description" content="${escapeHtml(description)}" />

    <meta property="og:type" content="${type}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:image" content="${escapeHtml(image)}" />
    <meta property="og:image:alt" content="${escapeHtml(title)}" />
    <meta property="og:url" content="${escapeHtml(url)}" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(image)}" />
  `

  // Remove existing default <title> if present to avoid duplicates
  return html
    .replace(/<title>.*?<\/title>/i, "")
    .replace("</head>", `${metadata}\n</head>`)
}

async function generateNoteImage(note: Note, outPath: string) {
  const isPersian = note.lang === "fa"
  const lines = note.content[0].split("\n")

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "1200px",
          height: "630px",
          backgroundColor: "#000000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px",
        },
        children: {
          type: "div",
          props: {
            style: {
              width: "100%",
              height: "100%",
              border: "2px solid #262626",
              borderRadius: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "48px 64px",
              color: "#f4f4f5",
              fontFamily: isPersian ? "Vazirmatn" : "Instrument Serif",
              direction: isPersian ? "rtl" : "ltr",
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "28px",
                    fontSize: isPersian ? "42px" : "46px",
                    lineHeight: 1.7,
                    textAlign: "center",
                  },
                  children: lines.map((line) => ({
                    type: "div",
                    props: { children: line },
                  })),
                },
              },
              note.author
                ? {
                    type: "div",
                    props: {
                      style: {
                        marginTop: "44px",
                        fontSize: "24px",
                        color: "#737373",
                      },
                      children: note.author,
                    },
                  }
                : null,
            ].filter(Boolean),
          },
        },
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Vazirmatn",
          data: vazirmatnFont,
          weight: 400,
          style: "normal",
        },
        {
          name: "Instrument Serif",
          data: instrumentSerifFont,
          weight: 400,
          style: "normal",
        },
      ],
    },
  )

  const png = new Resvg(svg).render().asPng()
  fs.writeFileSync(outPath, png)
}

async function generatePages() {
  const templatePath = path.join(DIST_DIR, "index.html")

  if (!fs.existsSync(templatePath)) {
    throw new Error("Vite build output not found. Run vite build first.")
  }

  const template = fs.readFileSync(templatePath, "utf-8")

  // 1. Artworks
  for (const art of artworks) {
    const outputDir = path.join(DIST_DIR, "art", art.slag)
    fs.mkdirSync(outputDir, { recursive: true })

    const html = injectMeta(template, {
      title: art.title || art.slag,
      description: art.description || "Artwork from Khalvai Gallery",
      image: absoluteUrl(art.imageUrl),
      url: `${SITE_URL}/art/${encodeURIComponent(art.slag)}`,
    })

    fs.writeFileSync(path.join(outputDir, "index.html"), html)
    console.log(`Generated: /art/${art.slag}`)
  }

  // 2. Notes
  const notesOgDir = path.join(DIST_DIR, "og", "notes")
  fs.mkdirSync(notesOgDir, { recursive: true })

  for (const note of notes) {
    const imageFile = `${note.slag}.png`
    await generateNoteImage(note, path.join(notesOgDir, imageFile))

    const outputDir = path.join(DIST_DIR, "notes", note.slag)
    fs.mkdirSync(outputDir, { recursive: true })

    const html = injectMeta(template, {
      title: note.title || note.author || note.slag,
      description: note.content[0].replace(/\n/g, " / "),
      image: absoluteUrl(`/og/notes/${encodeURIComponent(imageFile)}`),
      url: `${SITE_URL}/notes/${encodeURIComponent(note.slag)}`,
      type: "article",
    })

    fs.writeFileSync(path.join(outputDir, "index.html"), html)
    console.log(`Generated: /notes/${note.slag}`)
  }

  console.log(
    `Generated ${artworks.length} artwork pages and ${notes.length} note pages.`,
  )
}

generatePages()
