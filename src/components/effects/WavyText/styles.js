import styled, { keyframes } from "styled-components";

const bob = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-0.045em) rotate(-1.2deg); }
`;

export const Word = styled.span`
  display: inline-block;
  white-space: nowrap;
`;

export const Char = styled.span`
  display: inline-block;
  animation: ${bob} 4.2s ease-in-out infinite;
  animation-delay: calc(var(--i) * -0.22s);
`;

export const ScreenReaderText = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
`;
