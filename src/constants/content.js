import featuredWave from "../assets/img/featured-wave.png";
import featuredHorizon from "../assets/img/featured-horizon.png";

export const ARTIST = {
  name: "Moon Kyung Ae",
  email: "artist@example.com",
  year: 2026,
};

export const FEATURED_WORKS = [
  {
    id: "001",
    title: "Traces of Silence",
    titleKo: "침묵의 흔적",
    meta: "PAINTING · 2025",
    metaKo: "회화 · 2025",
    category: "Painting",
    categoryKo: "회화",
    year: "2025",
    medium: "Painting",
    mediumKo: "회화",
    description: "A quiet study of waves, where movement leaves a lasting trace of silence.",
    descriptionKo: "파도의 움직임이 지나간 자리에 남는 고요한 흔적을 담은 작품입니다.",
    image: featuredWave,
    alt: "대표 작품 — 부서지는 파도",
    altEn: "Featured artwork — breaking waves",
    size: "large",
  },
  {
    id: "002",
    title: "Fragments of Light",
    titleKo: "빛의 파편",
    meta: "MIXED MEDIA · 2024",
    metaKo: "혼합 매체 · 2024",
    category: "Mixed Media",
    categoryKo: "혼합 매체",
    year: "2024",
    medium: "Mixed Media",
    mediumKo: "혼합 매체",
    description: "Fragments of light and color come together to suggest a distant horizon.",
    descriptionKo: "빛과 색의 조각이 모여 저 멀리의 수평선을 그려내는 작품입니다.",
    image: featuredHorizon,
    alt: "대표 작품 — 노을 진 수평선",
    altEn: "Featured artwork — a sunset horizon",
    size: "small",
  },
];

export const EXHIBITIONS = [
  {
    year: "2026",
    title: "Echoes of Memory",
    titleKo: "기억의 메아리",
    place: "Sample Exhibition / Seoul",
    placeKo: "예시 전시 / 서울",
  },
  {
    year: "2025",
    title: "The Space Between",
    titleKo: "사이의 공간",
    place: "Sample Group Show / Seoul",
    placeKo: "예시 단체전 / 서울",
  },
  {
    year: "2024",
    title: "Fragments of Time",
    titleKo: "시간의 파편",
    place: "Sample Exhibition / Busan",
    placeKo: "예시 전시 / 부산",
  },
];
