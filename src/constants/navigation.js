/** target: 이동할 섹션 id / matches: 해당 메뉴를 활성 상태로 표시할 섹션들 */
export const NAV_ITEMS = [
  { target: "home", labelKey: "nav.home", mobileLabelKey: "nav.homeMobile" },
  { target: "works", labelKey: "nav.works", mobileLabelKey: "nav.worksMobile" },
  {
    target: "archive1",
    labelKey: "nav.archive",
    mobileLabelKey: "nav.archiveMobile",
    matches: ["archive1", "archive2"],
  },
  { target: "about", labelKey: "nav.about", mobileLabelKey: "nav.aboutMobile" },
  { target: "exhibitions", labelKey: "nav.exhibitions", mobileLabelKey: "nav.exhibitionsMobile" },
  { target: "contact", labelKey: "nav.contact", mobileLabelKey: "nav.contactMobile" },
];

export const isNavItemActive = (item, currentId) =>
  (item.matches ?? [item.target]).includes(currentId);
