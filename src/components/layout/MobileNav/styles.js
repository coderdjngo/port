import styled, { css } from "styled-components";
import { media } from "../../../styles/media";
import { serif } from "../../../styles/mixins";

const EASE_IN_OUT = "cubic-bezier(.65,0,.35,1)";
const LINK_DELAY = 0.25;
const LINK_STAGGER = 0.05;

export const Drawer = styled.nav`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.mobileNav};
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 18px;
  padding: 100px ${({ theme }) => theme.layout.side} 60px;
  overflow: hidden;
  isolation: isolate;
  background: #0b253a;

  ${({ $open, $duration }) => css`
    transform: translateY(${$open ? "0" : "-105%"});
    visibility: ${$open ? "visible" : "hidden"};
    transition:
      transform ${$duration}ms ${EASE_IN_OUT},
      visibility 0s linear ${$open ? 0 : $duration}ms;
  `}
`;

export const DrawerLink = styled.a`
  ${serif};
  align-self: flex-start;
  font-size: clamp(48px, 9vw, 88px);
  line-height: 1.13;

  ${media.short} {
    font-size: clamp(38px, 7vh, 50px);
  }

  &:hover {
    color: ${({ theme }) => theme.colors.sky};
  }

  ${({ $open, $order, theme }) => {
    const delay = $open ? LINK_DELAY + $order * LINK_STAGGER : 0;
    return css`
      opacity: ${$open ? 1 : 0};
      transform: ${$open ? "none" : "translateY(24px)"};
      transition:
        opacity 0.5s ease ${delay}s,
        transform 0.6s ${theme.ease} ${delay}s,
        color 0.3s;
    `;
  }}
`;
