import { useState } from "react"
import { useNavigate } from "react-router"
import { ArrowLeft } from "lucide-react"
import type { Note } from "../data"

export default function NotesTile({
  note,
  to = "/notes",
}: {
  note: Note
  to?: string
}) {
  const navigate = useNavigate()

  const total = note.content.length
  const hasMore = total > 1

  const open = () => navigate(to)

  return (
    <div className="group relative aspect-[3/3] w-full overflow-hidden rounded-lg border border-neutral-800 bg-black font-serif">
      {/* Clickable area: opens the full notes page */}
      <div
        role="link"
        onClick={open}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            open()
          }
        }}
        aria-label="Open notes"
        className="absolute inset-0 flex cursor-pointer items-center justify-center p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-neutral-500"
      >
        <p
          dir="auto"
          className="line-clamp-6 animate-[fadeIn_300ms_ease-out] text-center text-base leading-relaxed tracking-wide text-white sm:text-lg lg:text-xl"
        >
          {note.content[0]}
        </p>
      </div>

      {hasMore && (
        <>
          {/* Position dots */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden="true"
          >
            {note.content.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  i === 0 ? "bg-white" : "bg-neutral-700"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
