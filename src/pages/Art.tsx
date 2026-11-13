import { useParams } from "react-router"
import { artworks } from "../data"
import { useEffect } from "react"

type MediaPlayerProps = {
  soundCloudUrl?: string
  videoUrl?: string
  height?: number
}

export function MediaPlayer({
  soundCloudUrl,
  videoUrl,
  height = 166,
}: MediaPlayerProps) {
  // R2 video takes priority
  if (videoUrl) {
    return (
      <div className="w-full overflow-hidden rounded-xl  bg-black shadow-sm">
        <video
          src={videoUrl}
          controls
          playsInline
          preload="metadata"
          className="block w-full h-auto max-h-[70vh]"
        >
          Your browser does not support video playback.
        </video>
      </div>
    )
  }

  if (soundCloudUrl) {
    const src = `https://w.soundcloud.com/player/?url=${encodeURIComponent(soundCloudUrl)}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&visual=true`

    return (
      <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <iframe
          title="SoundCloud music player"
          src={src}
          width="100%"
          height={height}
          allow="autoplay"
          loading="lazy"
          className="block w-full border-0 invert hue-rotate-180"
        />
      </div>
    )
  }

  return null
}

interface InstagramEmbedProps {
  postUrl: string
}

export const InstagramEmbed: React.FC<InstagramEmbedProps> = ({ postUrl }) => {
  useEffect(() => {
    if (!document.getElementById("instagram-embed-script")) {
      const script = document.createElement("script")
      script.id = "instagram-embed-script"
      script.src = "https://www.instagram.com/embed.js"
      script.async = true
      document.body.appendChild(script)
    } else if ((window as any).instgrm) {
      ;(window as any).instgrm.Embeds.process()
    }
  }, [postUrl])

  const cleanUrl = postUrl.split("?")[0].replace(/\/$/, "")

  return (
    <div className="w-full flex justify-center">
      <blockquote
        className="instagram-media w-full rounded-lg border border-neutral-800 bg-neutral-900 shadow-sm"
        data-instgrm-permalink={`${cleanUrl}/`}
        data-instgrm-version="14"
        style={{ width: "100%", minWidth: "326px" }}
      >
        <div className="p-4 flex items-center justify-center min-h-[350px]">
          <span className="text-sm text-neutral-500 animate-pulse">
            Loading Instagram media...
          </span>
        </div>
      </blockquote>
    </div>
  )
}
export default function Art() {
  const { slag } = useParams<{ slag: string }>()

  const art = artworks.find((a) => a.slag === slag)

  if (!art) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        Artwork not found
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-md lg:max-w-lg flex flex-col gap-6">
        <header className="text-center">
          <h1 className="font-serif text-2xl sm:text-4xl font-semibold">
            {art.title || art.slag}
          </h1>
          {art.description && (
            <p className="mt-2 text-neutral-400">{art.description}</p>
          )}

          {/* Render bilingual lyrics/lines if present */}
          {art.lyrics && art.lyrics.length > 0 && (
            <div className="mt-4 flex flex-col gap-3 text-center">
              {art.lyrics.map((line, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  {line.fa && (
                    <p
                      dir="rtl"
                      lang="fa"
                      className="text-neutral-300 font-sans text-base leading-relaxed"
                    >
                      «{line.fa}»
                    </p>
                  )}
                  {line.en && (
                    <p
                      dir="ltr"
                      lang="en"
                      className="text-neutral-200 font-serif text-base sm:text-lg tracking-wide mt-0.5"
                    >
                      "{line.en}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
          <p className="mt-1 text-neutral-500">
            {art.artist} {art.year && `(${art.year})`}
          </p>
        </header>

        {art.instagramUrl ? (
          <InstagramEmbed postUrl={art.instagramUrl} />
        ) : art.videoUrl ? (
          <MediaPlayer videoUrl={art.videoUrl} />
        ) : art.songUrl ? (
          <MediaPlayer soundCloudUrl={art.songUrl} />
        ) : (
          <img
            src={art.imageUrl}
            alt={art.title || art.slag}
            className="mx-auto w-auto max-w-full max-h-[70vh] h-auto rounded-lg object-contain"
          />
        )}
      </div>
    </main>
  )
}
