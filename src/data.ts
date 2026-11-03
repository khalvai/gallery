export interface Art {
  slag: string
  title?: string
  artist: string
  year: string
  description: string
  imageUrl: string
  songUrl?: string
}
export const artworks: Art[] = [
  {
    slag: "in-silence",
    title: "In silence",
    artist: "Mohammad Reza Lotfi",
    year: "2010-2013",
    description: "deep emotions through melodies and soulful sounds. ",
    imageUrl: "/Lotfi.jpg",
    songUrl:
      "https://soundcloud.com/banafsheh-nemati/unknown-artist-unknown-album-1",
  },
  {
    slag: "night",
    title: "Night",
    artist: "",
    year: "",
    description: "",
    imageUrl: "/night.jpeg",
  },
  {
    slag: "couple",
    title: "Couple",
    artist: "",
    year: "",
    description: "",
    imageUrl: "/couple.jpeg",
  },
  {
    slag: "the-elegant-reader",
    title: "The Elegant Reader",
    artist: "Hans Joachim Neidhardt",
    year: "	1812",
    description: "",
    imageUrl: "/the-elegant-reader.jpeg",
  },
]
