import { useParams } from "react-router"
import { artworks } from "../data"

type SoundCloudPlayerProps = {
  trackUrl: string
  height?: number
}

export function SoundCloudPlayer({
  trackUrl,
  height = 166,
}: SoundCloudPlayerProps) {
  const src = `https://w.soundcloud.com/player/?url=${encodeURIComponent(trackUrl)}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&visual=true`

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
export default function Art() {
  const { slag } = useParams<{ slag: string }>()

  const art = artworks.find((a) => a.slag === slag)

  if (!art) {
    return <div>Artwork not found</div>
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-md lg:max-w-lg flex flex-col gap-6">
        <header className="text-center">
          <h1 className="font-serif text-2xl sm:text-4xl font-semibold">
            {art.title || art.slag}
          </h1>
          <p className="mt-2 text-neutral-400">{art.description}</p>
          <p className="mt-1 text-neutral-500">
            {art.artist} {art.year && `(${art.year})`}
          </p>
        </header>

        <img
          src={art.imageUrl}
          alt={art.title || art.slag}
          className="mx-auto w-auto max-w-full max-h-[70vh] h-auto rounded-lg"
        />
        {art.songUrl && <SoundCloudPlayer trackUrl={art.songUrl} />}
      </div>
    </main>
  )
}
