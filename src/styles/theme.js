/** 패널 톤별 보조 색상: Panel이 theme.tone으로 주입 */
export const tones = {
  dark: {
    text: "#f5f8fa",
    accent: "#a4d4ef",
    muted: "#b0c4d2",
    line: "rgba(255,255,255,.2)",
  },
  light: {
    text: "#102c40",
    accent: "#5986a5",
    muted: "#637d8e",
    line: "#b1c4ce",
  },
};

export const theme = {
  tone: tones.dark,
  colors: {
    navy: "#071725",
    navy2: "#0e293e",
    navy3: "#122f47",
    deep: "#040f19",
    sky: "#a4d4ef",
    cream: "#eaf0f3",
    white: "#f5f8fa",
    gray: "#b0c4d2",
    ink: "#102c40",
    line: "rgba(255,255,255,.2)",
  },
  fonts: {
    sans: '"DM Sans", sans-serif',
    serif: '"Italiana", serif',
  },
  /** 반응형으로 바뀌는 값은 GlobalStyle의 CSS 변수로 관리 */
  layout: {
    side: "var(--side)",
    header: "var(--header)",
    maxWidth: "1600px",
  },
  ease: "cubic-bezier(.22,1,.36,1)",
  zIndex: {
    panel: 1,
    activePanel: 2,
    indicator: 80,
    mobileNav: 95,
    header: 100,
    cursor: 200,
    modal: 300,
  },
};
