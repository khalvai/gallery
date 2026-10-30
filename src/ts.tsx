import { useRef } from "react"

export function Form() {
  const inputRef = useRef<HTMLInputElement>(null)
  const handleClick = () => {
    inputRef.current?.focus()
  }

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={handleClick}>Focus the input</button>
    </>
  )
}
