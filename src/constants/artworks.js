import work01 from "../assets/img/artist/work-01.png";
import work02 from "../assets/img/artist/work-02.png";
import work03 from "../assets/img/artist/work-03.png";
import work04 from "../assets/img/artist/work-04.png";
import work05 from "../assets/img/artist/work-05.png";
import work06 from "../assets/img/artist/work-06.png";
import work07 from "../assets/img/artist/work-07.png";
import work08 from "../assets/img/artist/work-08.png";
import work09 from "../assets/img/artist/work-09.png";
import work10 from "../assets/img/artist/work-10.png";
import work11 from "../assets/img/artist/work-11.png";
import work12 from "../assets/img/artist/work-12.png";
import work13 from "../assets/img/artist/work-13.png";
import work14 from "../assets/img/artist/work-14.png";

export const ARCHIVE_PAGE_SIZE = 3;

const artworkImages = [
  work01,
  work02,
  work03,
  work04,
  work05,
  work06,
  work07,
  work08,
  work09,
  work10,
  work11,
  work12,
  work13,
  work14,
];

export const ARTWORKS = artworkImages.map((image, index) => {
  const number = String(index + 1).padStart(2, "0");
  const isNamedWork = index === 0;

  return {
    id: index + 1,
    title: isNamedWork ? "Variations in Emerald Blue" : `Artwork ${number}`,
    titleKo: isNamedWork ? "에메랄드 블루의 변주" : `작품 ${number}`,
    year: isNamedWork ? "2025" : "—",
    medium: isNamedWork ? "Acrylic on canvas · 31.8 × 40.9 cm (6F)" : "Painting",
    mediumKo: isNamedWork ? "아크릴릭 온 캔버스 · 31.8 × 40.9cm (6F)" : "회화",
    image,
  };
});

export const ARCHIVE_PAGE_COUNT = Math.ceil(ARTWORKS.length / ARCHIVE_PAGE_SIZE);
