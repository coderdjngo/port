import { HiddenSvg } from "./styles";

export const WATER_FILTER_ID = "water-distortion";
export const waterFilterUrl = `url(#${WATER_FILTER_ID})`;

/**
 * 이미지 hover 시 수면에 비친 듯 일렁이게 만드는 SVG 필터 정의.
 * 앱 루트에 한 번만 렌더링하고 CSS에서 filter: url(#water-distortion)로 사용.
 */
export function WaterFilter() {
  return (
    <HiddenSvg aria-hidden="true" focusable="false">
      <filter id={WATER_FILTER_ID} x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.008 0.03" numOctaves="2" seed="7">
          <animate
            attributeName="baseFrequency"
            dur="9s"
            values="0.008 0.03; 0.012 0.045; 0.008 0.03"
            repeatCount="indefinite"
          />
        </feTurbulence>
        <feDisplacementMap in="SourceGraphic" scale="22" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </HiddenSvg>
  );
}
