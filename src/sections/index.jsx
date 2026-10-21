import { About } from "./About";
import { Archive } from "./Archive";
import { Contact } from "./Contact";
import { Exhibitions } from "./Exhibitions";
import { Hero } from "./Hero";
import { SelectedWorks } from "./SelectedWorks";
import { Visual } from "./Visual";
import { ARCHIVE_PAGE_COUNT } from "../constants/artworks";
import { EXHIBITION_PAGE_COUNT } from "../constants/content";

/**
 * 풀페이지 화면 구성. 배열 순서 = 화면 순서.
 * tone: 패널 색 톤(dark | light) / background: 패널 배경색
 */
const ARCHIVE_SECTIONS = Array.from({ length: ARCHIVE_PAGE_COUNT }, (_, page) => ({
  id: `archive${page + 1}`,
  labelKey: "section.archive",
  background: "#071b2b",
  Component: Archive,
  props: {
    page,
    pageCount: ARCHIVE_PAGE_COUNT,
    titleKey: page === 0 ? "archive.title" : "archive.moreTitle",
    descriptionKey: page === 0 ? "archive.description" : "archive.moreDescription",
  },
}));

const EXHIBITION_SECTIONS = Array.from({ length: EXHIBITION_PAGE_COUNT }, (_, page) => ({
  id: page === 0 ? "exhibitions" : `exhibitions${page + 1}`,
  labelKey: "section.exhibitions",
  background: "#0c263a",
  Component: Exhibitions,
  props: { page },
}));

export const SECTIONS = [
  { id: "home", labelKey: "section.home", Component: Hero, background: "#163b57" },
  { id: "works", labelKey: "section.works", tone: "light", Component: SelectedWorks },
  ...ARCHIVE_SECTIONS,
  { id: "visual", labelKey: "section.visual", Component: Visual },
  { id: "about", labelKey: "section.about", tone: "light", Component: About },
  ...EXHIBITION_SECTIONS,
  { id: "contact", labelKey: "section.contact", background: "#040f19", Component: Contact },
];

export const SECTION_IDS = SECTIONS.map(({ id }) => id);
