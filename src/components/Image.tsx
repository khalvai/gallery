import { useNavigate } from "react-router"

type Props = {
  address: string
  alt?: string
  name?: string
  songUrl?: string
}

export default function Image({
  address,
  alt = "",
  name = "Untitled",
  songUrl,
}: Props) {
  const navigate = useNavigate()
  const handleListen = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevents triggering parent click events
    navigate(`/art/${name}`)
  }

  return (
    <div className="group relative overflow-hidden rounded-lg font-serif">
      <img
        src={address}
        alt={alt}
        loading="lazy"
        className="w-full aspect-[3/4] object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-between items-start p-4 pointer-events-none group-hover:pointer-events-auto ">
        <span className="text-white font-medium text-2xl drop-shadow">
          {name}
        </span>

        {songUrl && (
          <button
            onClick={handleListen}
            className="bg-white/90 hover:bg-white text-gray-900 font-semibold text-xlg px-3 py-2 rounded-full shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Listen
          </button>
        )}
      </div>
    </div>
  )
}
