import { useState, useEffect } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useParams } from "react-router"
import { notes } from "../data"

export default function NotesSlider() {
  const [index, setIndex] = useState(0)

  const { title } = useParams<{ title: string }>()

  useEffect(() => {
    if (title) {
      const foundIndex = notes.findIndex((note) => note.title === title)
      if (foundIndex !== -1) setIndex(foundIndex)
    }
  }, [title])

  const prev = () => setIndex((i) => Math.max(0, i - 1))
  const next = () => setIndex((i) => Math.min(notes.length - 1, i + 1))
  const [slide, setSlide] = useState(0)
  const note = notes[index]
  const total = note.content.length
  const hasMore = total > 1
  const isFirst = slide === 0
  const isLast = slide === total - 1

  const go = (step: number) =>
    setSlide((s) => Math.min(total - 1, Math.max(0, s + step)))

  const arrowButton =
    "absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-700 bg-black/80 text-white shadow-md transition-opacity duration-300 hover:bg-neutral-900 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 opacity-100 md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLElement &&
        e.target.closest("input, textarea")
      )
        return
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  if (notes.length === 0) {
    return (
      <div className="min-h-screen bg-black p-8 text-white">No notes yet</div>
    )
  }

  return (
    <main className="flex flex-col items-center bg-black px-4 py-8 text-white">
      <div className="flex w-full max-w-md flex-col gap-6 lg:max-w-lg">
        <article className="group relative flex min-h-64  items-center just  flex-col gap-4 rounded-lg border border-neutral-800 bg-black px-14 py-8 animate-[fadeIn_300ms_ease-out]">
          {note.title && (
            <h2
              dir="auto"
              className="text-center font-serif text-xl font-semibold text-white sm:text-2xl"
            >
              {note.title}
            </h2>
          )}

          <div className="flex flex-1 items-center justify-center">
            <p
              key={slide}
              dir="auto"
              className="animate-[fadeIn_300ms_ease-out] whitespace-pre-line text-center font-serif text-base leading-relaxed tracking-wide text-neutral-200 sm:text-lg"
            >
              {note.content[slide]}
            </p>
          </div>

          {hasMore && (
            <>
              {!isFirst && (
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous part"
                  className={`${arrowButton} left-2`}
                >
                  <ArrowLeft size={13} aria-hidden="true" />
                </button>
              )}

              {!isLast && (
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next part"
                  className={`${arrowButton} right-2`}
                >
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              )}

              <div className="flex justify-center gap-1.5" aria-hidden="true">
                {note.content.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 w-1.5 rounded-full transition-colors ${
                      i === slide ? "bg-white" : "bg-neutral-700"
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {note.date && (
            <p className="text-center text-sm text-neutral-500">{note.date}</p>
          )}
        </article>
      </div>
    </main>
  )
}
