export interface Art {
  slag: string
  title?: string
  artist: string
  year: string
  description: string
  imageUrl: string
  videoUrl?: string
  songUrl?: string
  instagramUrl?: string
  lyrics?: { fa: string; en: string }[]
}

export interface Note {
  title: string
  slag: string
  lang: "fa" | "en"
  content: string[]
  translation?: string[]
  date?: string
  author?: string
}
export const notes: Note[] = [
  {
    title: "What Happened ?",
    slag: "what-happened",
    content: ["They came.", "Suffered.", "Disappeared."],
    lang: "en",
  },
  {
    title: "",
    slag: "saz-mishavim",
    lang: "fa",
    content: [
      "آن نَخلِ ناخَلَف که تَبَر شُد زِ ما نَبُود\n\nما را زَمانه گَر شِکَنَد ساز می‌شَویم",
    ],
    translation: [
      "That unworthy palm that became an axe was never one of us;",
      "Should time break us, we become a musical instrument.",
    ],

    author: "صائب تبریزی",
  },
]
export const artworks: Art[] = [
  {
    slag: "in-silence",
    title: "In silence",
    artist: "Mohammad Reza Lotfi",
    year: "2010-2013",
    description: "Emotions through melodies and soulful sounds. ",
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
    description: "",
    artist: "",
    year: "",
    lyrics: [
      {
        fa: "این چشم‌ها جادوییه، این عشق دیوانه‌واره",
        en: "These eyes are magical, this love is wild.",
      },
      {
        fa: "جانان، جانان",
        en: "Sweetheart, sweetheart...",
      },
      {
        fa: "جانان که تو این دنیا باشه این دنیا خیلی قشنگه",
        en: "Sweetheart, if you are in this world, this world is so beautiful.",
      },
    ],
    imageUrl: "/janan.webp",
    instagramUrl: "https://www.instagram.com/reel/DfeWP4MoiYa/",
  },

  {
    title: "I Am the Land",
    slag: "i-am-the-land",
    description: "",
    artist: "Mahmoud Darvish",
    year: "",
    lyrics: [
      {
        fa: "سینه‌اش را تفتیش کردند و جز قلبش چیزی نیافتند.",
        en: "They searched his chest, and found nothing but his heart.",
      },
      {
        fa: "قلبش را تفتیش کردند و جز ملتش چیزی نیافتند.",
        en: "They searched his heart, and found nothing but his people.",
      },
      {
        fa: "صدایش را تفتیش کردند و جز اندوهش چیزی نیافتند.",
        en: "They searched his voice, and found nothing but his grief.",
      },
      {
        fa: "اندوهش را تفتیش کردند و جز زندانش چیزی نیافتند.",
        en: "They searched his grief, and found nothing but his prison.",
      },
      {
        fa: "زندانش را تفتیش کردند و جز خودشان را در زنجیر نیافتند.",
        en: "They searched his prison, and found nothing but themselves in chains.",
      },
    ],
    imageUrl: "/mahmoud-darwish.webp",
    videoUrl: "https://media.khalvai.com/videos/Mahmoud-Darwish.mp4",
  },
]
