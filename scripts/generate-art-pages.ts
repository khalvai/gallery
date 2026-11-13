import fs from "node:fs"
import path from "node:path"
import { artworks } from "../src/data"

const SITE_URL = "https://gallery.khalvai.com"
const DIST_DIR = path.resolve("dist")

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

function generateMetadata(html: string, art: (typeof artworks)[number]) {
  const title = art.title || art.slag
  const description = art.description || "Artwork from Khalvai Gallery"

  // Use the artwork image for previews, even if it has a video
  // or Instagram embed.
  const image = absoluteUrl(art.imageUrl)
  const url = `${SITE_URL}/art/${encodeURIComponent(art.slag)}`

  const metadata = `
    <title>${escapeHtml(title)} | Khalvai Gallery</title>
    <meta name="description" content="${escapeHtml(description)}" />

    <meta property="og:type" content="website" />

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

  return html.replace("</head>", `${metadata}\n</head>`)
}

function generatePages() {
  const templatePath = path.join(DIST_DIR, "index.html")

  if (!fs.existsSync(templatePath)) {
    throw new Error("Vite build output not found. Run vite build first.")
  }

  const template = fs.readFileSync(templatePath, "utf-8")

  for (const art of artworks) {
    const outputDir = path.join(DIST_DIR, "art", art.slag)

    fs.mkdirSync(outputDir, { recursive: true })

    const html = generateMetadata(template, art)

    fs.writeFileSync(path.join(outputDir, "index.html"), html)

    console.log(`Generated: /art/${art.slag}`)
  }

  console.log(`Generated ${artworks.length} artwork pages.`)
}

generatePages()
