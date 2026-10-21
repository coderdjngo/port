/** 반응형 브레이크포인트 헬퍼: ${media.mobile} { ... } */
const maxWidth = (px) => `@media (max-width: ${px}px)`;
const maxHeight = (px) => `@media (max-height: ${px}px)`;

export const media = {
  laptop: maxWidth(1200),
  tablet: maxWidth(876),
  mobile: maxWidth(768),
  small: maxWidth(580),
  xsmall: maxWidth(480),
  tiny: maxWidth(360),
  short: maxHeight(700),
  shorter: maxHeight(580),
};
