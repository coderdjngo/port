import { ARTWORKS } from "./artworks";

export const ARTIST = {
  name: "Moon, Kyung Ae",
  year: new Date().getFullYear(),
  socials: [
    { name: "Instagram", href: "https://instagram.com/gomtiiiing/" },
    { name: "Facebook", href: "https://www.facebook.com/GomTiiing" },
  ],
};

export const FEATURED_WORKS = ARTWORKS.slice(0, 2).map((work, index) => ({
  ...work,
  id: String(index + 1).padStart(3, "0"),
  meta: index === 0 ? "ACRYLIC ON CANVAS · 2025" : "PAINTING",
  metaKo: index === 0 ? "아크릴릭 온 캔버스 · 2025" : "회화",
  alt: index === 0 ? "에머럴드불루의 변주" : "문경애 작가 작품 02",
  altEn: index === 0 ? "Variations in Emerald Blue" : "Painting by Moon, Kyung Ae, work 02",
  size: index === 0 ? "large" : "small",
}));

export const EXHIBITIONS = [
  {
    year: "2025",
    title: "Group exhibition",
    titleKo: "단체전",
    events: [
      "향(香)과 형(形) 두루회원전 (커피1011, 대전)",
      "열개의 문 전 (특허연수원, 대전)",
      "대전미술제 (대전예술가의집, 대전)",
      "아트포아트 300인전시 (아트포아트, 대전)",
      "새롭게걷다전 (M갤러리, 대전)",
    ],
  },
  {
    year: "2024",
    title: "Group exhibition",
    titleKo: "단체전",
    events: [
      "오늘은맛있는그림전 (카페1011, 대전)",
      "새롭게걷다전 (M갤러리, 대전)",
      "두루미전시 (갑동 헤비츠갤러리, 3월)",
      "대전미술제 (예술가의집, 3월)",
      "두루미전시 담소화락 (윤갤러리, 6월)",
      "이코노텍스트전 (이공갤러리, 8월)",
    ],
  },
  {
    year: "2023",
    title: "Solo exhibition",
    titleKo: "개인전",
    events: ["검은푸른_어디쯤 (갤러리고트빈, 대전)"],
  },
  {
    year: "2023",
    title: "Group exhibition",
    titleKo: "단체전",
    events: [
      "이코노텍스트전 (갤러리고트빈, 대전)",
      "커피1011 특별전 (카페1011, 대전)",
      "개별적 형상전 (ZEN갤러리, 대전)",
      "대전예술지 vol.332 지상갤러리 (2023년 1월호)",
    ],
  },
  {
    year: "2022",
    title: "Group exhibition",
    titleKo: "단체전",
    events: ["이코노텍스트전 (갤러리고트빈, 대전)"],
  },
  {
    year: "2021",
    title: "Group exhibition",
    titleKo: "단체전",
    events: [
      "예치과갤러리 초대전 (예치과, 대전)",
      "시뮬라시옹전 (꼬시꼬시, 대전)",
    ],
  },
  {
    year: "2019",
    title: "Group exhibition",
    titleKo: "단체전",
    events: ["바라보다전 (M갤러리, 대전)", "자늑자늑전 (M갤러리, 대전)"],
  },
  {
    year: "2019",
    title: "Other exhibition",
    titleKo: "기타 전시",
    events: ["바른나무 木가구전 (갤러리고트빈, 대전)"],
  },
  {
    year: "2017",
    title: "Other exhibition",
    titleKo: "기타 전시",
    events: ["한국목공교육협회 목공작품전 (타임월드, 대전)"],
  },
  {
    year: "—",
    yearKo: "—",
    title: "Awards",
    titleKo: "입선 및 특선",
    events: [
      "대전광역시미술대전 입선 및 특선",
      "금강미술대전 입선 및 특선",
      "여성미술대전 입선 및 특선",
    ],
  },
];

export const EXHIBITION_PAGE_SIZE = 5;
export const EXHIBITION_PAGE_COUNT = Math.ceil(EXHIBITIONS.length / EXHIBITION_PAGE_SIZE);
