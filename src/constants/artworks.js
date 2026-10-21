import blueReverie from "../assets/img/work-blue-reverie.png";
import silentLandscape from "../assets/img/work-silent-landscape.png";
import beyondTheSurface from "../assets/img/work-beyond-the-surface.png";
import shiftingMemories from "../assets/img/work-shifting-memories.png";
import quietHour from "../assets/img/work-quiet-hour.png";
import innerDialogue from "../assets/img/work-inner-dialogue.png";

export const ARTWORK_CATEGORIES = [
  { value: "all", labelKey: "archive.all" },
  { value: "painting", labelKey: "archive.painting" },
  { value: "photography", labelKey: "archive.photography" },
  { value: "mixed", labelKey: "archive.mixed" },
];

export const ARCHIVE_PAGE_SIZE = 3;

export const ARTWORKS = [
  {
    id: 1,
    title: "Blue Reverie",
    titleKo: "푸른 몽상",
    category: "painting",
    categoryKo: "회화",
    year: "2025",
    medium: "Painting",
    mediumKo: "회화",
    image: blueReverie,
    description: "An exploration of color, emotion, and the quiet rhythms of abstraction.",
    descriptionKo: "색채와 감정, 추상적인 형태가 만들어내는 고요한 리듬을 탐구한 작품입니다.",
  },
  {
    id: 2,
    title: "Silent Landscape",
    titleKo: "고요한 풍경",
    category: "photography",
    categoryKo: "사진",
    year: "2025",
    medium: "Photography",
    mediumKo: "사진",
    image: silentLandscape,
    description: "A contemplative shoreline capturing stillness, atmosphere, and space.",
    descriptionKo: "고요함과 분위기, 공간의 감각을 담아낸 해안 풍경입니다.",
  },
  {
    id: 3,
    title: "Beyond the Surface",
    titleKo: "표면 너머",
    category: "mixed",
    categoryKo: "혼합 매체",
    year: "2024",
    medium: "Mixed Media",
    mediumKo: "혼합 매체",
    image: beyondTheSurface,
    description: "A visual dialogue between form, texture, and layers of perception.",
    descriptionKo: "형태와 질감, 여러 겹의 시선이 주고받는 시각적 대화입니다.",
  },
  {
    id: 4,
    title: "Shifting Memories",
    titleKo: "움직이는 기억",
    category: "painting",
    categoryKo: "회화",
    year: "2024",
    medium: "Painting",
    mediumKo: "회화",
    image: shiftingMemories,
    description: "A study of transitions, recollection, and the restless motion of water.",
    descriptionKo: "변화와 회상, 끊임없이 움직이는 물의 흐름을 담은 작품입니다.",
  },
  {
    id: 5,
    title: "The Quiet Hour",
    titleKo: "고요한 시간",
    category: "photography",
    categoryKo: "사진",
    year: "2023",
    medium: "Photography",
    mediumKo: "사진",
    image: quietHour,
    description: "A moment of light and silence suspended at the edge of the tide.",
    descriptionKo: "밀물과 썰물 사이, 빛과 고요가 머무는 순간을 포착했습니다.",
  },
  {
    id: 6,
    title: "Inner Dialogue",
    titleKo: "내면의 대화",
    category: "mixed",
    categoryKo: "혼합 매체",
    year: "2023",
    medium: "Mixed Media",
    mediumKo: "혼합 매체",
    image: innerDialogue,
    description: "An artistic conversation between material, gesture, and the deep.",
    descriptionKo: "재료와 움직임, 깊은 내면이 나누는 예술적 대화입니다.",
  },
];
