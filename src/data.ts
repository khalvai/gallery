export interface Art {
  name: string
  artist: string
  year: string
  description: string
  imageUrl: string
  songUrl?: string
}
export const artworks: Art[] = [
  {
    name: "In silence",
    artist: "Mohammad Reza Lotfi",
    year: "2010-2013",
    description: "deep emotions through melodies and soulful sounds. ",
    imageUrl: "/Lotfi.jpg",
    songUrl:
      "https://soundcloud.com/banafsheh-nemati/unknown-artist-unknown-album-1",
  },
  {
    name: "night",
    artist: "",
    year: "",
    description: "",
    imageUrl: "/night.jpeg",
  },
  {
    name: "couple",
    artist: "",
    year: "",
    description: "",
    imageUrl: "/couple.jpeg",
  },
]
