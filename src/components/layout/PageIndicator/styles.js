import styled, { css, keyframes } from "styled-components";
import { media } from "../../../styles/media";
import { circleButton } from "../../../styles/mixins";

/** $light: 밝은 패널 위에서는 진한 잉크색으로 */
const ink = ({ $light, theme }) => ($light ? theme.colors.ink : "#fff");

const fixedLayer = css`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.indicator};
  color: ${ink};
  transition: color 0.5s;
`;

const pulse = keyframes`
  from { box-shadow: 0 0 0 0 rgba(164, 212, 239, .55); }
  to { box-shadow: 0 0 0 10px rgba(164, 212, 239, 0); }
`;

export const DotList = styled.nav`
  ${fixedLayer};
  right: clamp(13px, 2.6vw, 45px);
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;

  ${media.mobile} {
    right: 6px;
    gap: 5px;
  }
`;

export const Dot = styled.button`
  ${circleButton(24)};

  &::before {
    content: "";
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: currentColor;
    opacity: 0.6;
    transition: 0.3s;
  }

  ${({ $active, theme }) =>
    $active &&
    css`
      &::before {
        width: 11px;
        height: 11px;
        border: 2px solid currentColor;
        background: ${theme.colors.sky};
        opacity: 1;
        animation: ${pulse} 1.8s ease-out infinite;
      }
    `}

  ${media.mobile} {
    width: 20px;
    height: 20px;
  }
`;

export const Count = styled.div`
  ${fixedLayer};
  bottom: 25px;
  right: ${({ theme }) => theme.layout.side};
  font-size: 11px;
  letter-spacing: 0.17em;
`;

export const DownButton = styled.button`
  ${fixedLayer};
  ${circleButton(44)};
  bottom: 18px;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid currentColor;
  font-size: 22px;
  transition:
    background 0.3s,
    color 0.5s;

  &:hover {
    background: #ffffff2b;
  }

  ${media.tiny} {
    width: 36px;
    height: 36px;
  }
`;
