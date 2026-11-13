import Image from "../components/Image.tsx"
import { Link } from "react-router"
import { artworks, notes } from "../data.ts"
import NotesTile from "../components/NoteTile.tsx"

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl p-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-3 gap-4">
        {artworks.map((a) => (
          <Link
            key={a.slag}
            to={`/art/${a.slag}`}
            className="group relative block overflow-hidden rounded-lg bg-neutral-900"
          >
            <Image art={a} />
          </Link>
        ))}
        {notes.map((note) => (
          <Link
            key={note.title}
            to={`/notes/${note.slag}`}
            className="group relative block overflow-hidden rounded-lg bg-neutral-900"
          >
            <NotesTile note={note} />
          </Link>
        ))}
      </div>
    </div>
  )
}
