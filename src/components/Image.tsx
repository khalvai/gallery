type Props = { address: string; alt?: string }

export default function Image({ address, alt = "" }: Props) {
  return (
    <img
      src={address}
      alt={alt}
      loading="lazy"
      className="w-full aspect-[3/4] object-cover rounded-lg"
    />
  )
}
