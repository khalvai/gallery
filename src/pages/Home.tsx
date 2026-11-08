import Image from "../components/Image.tsx"
import { Link } from "react-router"
import { artworks } from "../data.ts"

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {artworks.map((a) => (
          <Link
            key={a.slag}
            to={`/arts/${a.slag}`}
            className="group relative block overflow-hidden rounded-lg bg-neutral-900"
          >
            <Image art={a} />
          </Link>
        ))}
      </div>
    </div>
  )
}
