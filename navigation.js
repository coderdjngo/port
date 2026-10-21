import { ARCHIVE_PAGE_COUNT } from "./artworks";
import { EXHIBITION_PAGE_COUNT } from "./content";

/** target: 이동할 섹션 id / matches: 해당 메뉴를 활성 상태로 표시할 섹션들 */
export const NAV_ITEMS = [
  { target: "home", labelKey: "nav.home", mobileLabelKey: "nav.homeMobile" },
  { target: "works", labelKey: "nav.works", mobileLabelKey: "nav.worksMobile" },
  {
    target: "archive1",
    labelKey: "nav.archive",
    mobileLabelKey: "nav.archiveMobile",
    matches: Array.from({ length: ARCHIVE_PAGE_COUNT }, (_, page) => `archive${page + 1}`),
  },
  { target: "about", labelKey: "nav.about", mobileLabelKey: "nav.aboutMobile" },
  {
    target: "exhibitions",
    labelKey: "nav.exhibitions",
    mobileLabelKey: "nav.exhibitionsMobile",
    matches: Array.from({ length: EXHIBITION_PAGE_COUNT }, (_, page) =>
      page === 0 ? "exhibitions" : `exhibitions${page + 1}`,
    ),
  },
  { target: "contact", labelKey: "nav.contact", mobileLabelKey: "nav.contactMobile" },
];

export const isNavItemActive = (item, currentId) =>
  (item.matches ?? [item.target]).includes(currentId);
