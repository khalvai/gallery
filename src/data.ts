export interface Art {
  slag: string
  title?: string
  artist: string
  year: string
  description: string
  imageUrl: string
  songUrl?: string
  instagramUrl?: string
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
  {
    title: "Janan",
    slag: "janan",
    artist: "Featured in video by @poyanjafarii",
    year: "	2026",
    description: "",
    imageUrl: "/janan.webp",
    instagramUrl:
      "https://www.instagram.com/reel/DfeWP4MoiYa/?utm_source=ig_web_copy_link&cplk=NTc4MTIwNjQ2YQ",
  },
]
