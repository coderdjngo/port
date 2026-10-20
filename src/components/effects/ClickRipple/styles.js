import styled, { keyframes } from "styled-components";

const spread = keyframes`
  from {
    transform: translate(-50%, -50%) scale(0.1);
    opacity: 0.9;
  }
  to {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
  }
`;

export const Layer = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.cursor};
  pointer-events: none;
  overflow: hidden;
`;

export const Ring = styled.span`
  position: absolute;
  width: 120px;
  height: 120px;
  border: 1px solid ${({ theme }) => theme.colors.sky};
  border-radius: 50%;
  opacity: 0;
  box-shadow: 0 0 18px rgba(164, 212, 239, 0.35), inset 0 0 12px rgba(164, 212, 239, 0.25);
  animation: ${spread} 1.1s cubic-bezier(0.2, 0.7, 0.3, 1) ${({ $delay }) => $delay}s forwards;
`;
