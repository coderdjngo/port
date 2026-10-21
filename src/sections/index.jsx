import { About } from "./About";
import { Archive } from "./Archive";
import { Contact } from "./Contact";
import { Exhibitions } from "./Exhibitions";
import { Hero } from "./Hero";
import { SelectedWorks } from "./SelectedWorks";
import { Visual } from "./Visual";

/**
 * 풀페이지 화면 구성. 배열 순서 = 화면 순서.
 * tone: 패널 색 톤(dark | light) / background: 패널 배경색
 */
export const SECTIONS = [
  { id: "home", labelKey: "section.home", Component: Hero, background: "#163b57" },
  { id: "works", labelKey: "section.works", tone: "light", Component: SelectedWorks },
  {
    id: "archive1",
    labelKey: "section.archive1",
    background: "#071b2b",
    Component: Archive,
    props: {
      page: 0,
      titleKey: "archive.title",
      descriptionKey: "archive.description",
      link: { to: "archive2", textKey: "archive.next", direction: "next" },
    },
  },
  {
    id: "archive2",
    labelKey: "section.archive2",
    background: "#071b2b",
    Component: Archive,
    props: {
      page: 1,
      titleKey: "archive.moreTitle",
      descriptionKey: "archive.moreDescription",
      link: { to: "archive1", textKey: "archive.previous", direction: "prev" },
    },
  },
  { id: "visual", labelKey: "section.visual", Component: Visual },
  { id: "about", labelKey: "section.about", tone: "light", Component: About },
  { id: "exhibitions", labelKey: "section.exhibitions", background: "#0c263a", Component: Exhibitions },
  { id: "contact", labelKey: "section.contact", background: "#040f19", Component: Contact },
];

export const SECTION_IDS = SECTIONS.map(({ id }) => id);
