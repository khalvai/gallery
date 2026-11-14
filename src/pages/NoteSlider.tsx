import { useState, useEffect } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useParams } from "react-router"
import { notes } from "../data"

export default function NotesSlider() {
  const [index, setIndex] = useState(0)
  const [slide, setSlide] = useState(0)
  const [showTranslation, setShowTranslation] = useState(false)

  const { slag } = useParams<{ slag: string }>()

  useEffect(() => {
    if (slag) {
      const foundIndex = notes.findIndex((note) => note.slag === slag)
      if (foundIndex !== -1) setIndex(foundIndex)
    }
  }, [slag])

  const prev = () => {
    setIndex((i) => Math.max(0, i - 1))
    setSlide(0)
    setShowTranslation(false)
  }

  const next = () => {
    setIndex((i) => Math.min(notes.length - 1, i + 1))
    setSlide(0)
    setShowTranslation(false)
  }

  const note = notes[index]
  const hasTranslation = Boolean(note?.translation?.length)
  const isShowingEnglish = note?.lang === "en" || showTranslation
  const activeLines =
    showTranslation && note?.translation
      ? note.translation
      : (note?.content ?? [])

  const total = activeLines.length
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
    <main className="flex flex-col justify-center items-center bg-black px-4 py-30 text-white">
      <div className="flex w-full max-w-md flex-col gap-6 lg:max-w-lg">
        <article
          lang={isShowingEnglish ? "en" : "fa"}
          className={`group relative flex min-h-64 animate-[fadeIn_300ms_ease-out] flex-col items-center justify-center gap-4 rounded-lg border border-neutral-800 bg-black px-14 py-8 ${
            isShowingEnglish ? "font-serif" : "font-persian"
          }`}
        >
          {hasTranslation && (
            <button
              type="button"
              onClick={() => setShowTranslation((prev) => !prev)}
              aria-label={
                showTranslation
                  ? "Show original Persian"
                  : "Translate to English"
              }
              className="absolute top-3 right-3 flex cursor-pointer items-center gap-1 rounded-md border border-neutral-800 px-2 py-1 text-lg text-neutral-500 transition-colors hover:border-neutral-700 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
            >
              <span>{showTranslation ? "FA" : "EN"}</span>
            </button>
          )}

          {note.title && (
            <h2
              className={`text-center text-white ${
                isShowingEnglish
                  ? "text-xl font-semibold sm:text-2xl"
                  : "text-lg font-medium leading-relaxed sm:text-xl"
              }`}
            >
              {note.title}
            </h2>
          )}

          <div className="flex flex-1 items-center justify-center">
            <p
              key={`${index}-${slide}-${showTranslation}`}
              className={`animate-[fadeIn_300ms_ease-out] whitespace-pre-line text-center text-neutral-200 ${
                isShowingEnglish
                  ? "text-base leading-relaxed tracking-wide sm:text-2xl"
                  : "text-base leading-loose font-normal sm:text-2xl"
              }`}
            >
              {activeLines[slide]}
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
                  <ArrowLeft size={18} aria-hidden="true" />
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
                {activeLines.map((_, i) => (
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

          <div className="flex flex-col items-center gap-1 text-center text-xs text-neutral-500">
            {note.author && <span>{note.author}</span>}
            {note.date && <span dir="ltr">{note.date}</span>}
          </div>
        </article>
      </div>
    </main>
  )
}
