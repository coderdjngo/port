import styled, { keyframes } from "styled-components";

const drift = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

export const Waves = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: ${({ $height }) => $height}px;
  overflow: hidden;
  pointer-events: none;
  z-index: -1;
`;

export const WaveLayer = styled.div`
  position: absolute;
  inset: 0;
  transform: translateY(${({ $offset }) => $offset}px);
`;

export const WaveSvg = styled.svg`
  display: block;
  width: 200%;
  height: 100%;
  animation: ${drift} ${({ $duration }) => $duration}s linear infinite;
`;
