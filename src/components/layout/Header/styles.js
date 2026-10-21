import styled, { css } from "styled-components";
import { media } from "../../../styles/media";
import { circleButton } from "../../../styles/mixins";

export const Bar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.header};
  height: ${({ theme }) => theme.layout.header};
  padding: 0 ${({ theme }) => theme.layout.side};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  background: rgba(4, 17, 29, 0.7);
  backdrop-filter: blur(16px);
`;

export const Logo = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.16em;
  white-space: nowrap;

  ${media.tiny} {
    font-size: 12px;
  }
`;

export const LogoMark = styled.span`
  font-size: 28px;
  color: ${({ theme }) => theme.colors.sky};
`;

export const Gnb = styled.nav`
  display: flex;
  gap: clamp(10px, 1.4vw, 22px);

  ${media.laptop} {
    gap: 12px;
  }
  ${media.tablet} {
    display: none;
  }
`;

export const GnbLink = styled.a`
  position: relative;
  padding: 10px 0;
  font-size: 15px;
  letter-spacing: 0.1em;
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.sky};
  }

  /* 활성 메뉴 밑줄이 물결처럼 차오른다 */
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 2px;
    height: 1px;
    background: ${({ theme }) => theme.colors.sky};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s ${({ theme }) => theme.ease};
  }

  ${({ $active, theme }) =>
    $active &&
    css`
      color: ${theme.colors.sky};

      &::after {
        transform: scaleX(1);
      }
    `}
`;

export const LanguageButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  flex-shrink: 0;
  padding: 9px 11px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 30px;
  font-size: 13px;
  letter-spacing: 0.08em;
  transition: color 0.3s, border-color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.sky};
    border-color: ${({ theme }) => theme.colors.sky};
  }

  svg {
    width: 15px;
    height: 15px;
  }
`;

export const MenuButton = styled.button`
  ${circleButton(44)};
  display: none;
  flex-direction: column;
  align-content: center;
  gap: 6px;
  flex-shrink: 0;
  border: 1px solid ${({ theme }) => theme.colors.line};

  span {
    width: 19px;
    height: 1px;
    background: #fff;
    transition: transform 0.3s;
  }

  ${({ $open }) =>
    $open &&
    css`
      span:first-child {
        transform: translateY(3.5px) rotate(45deg);
      }
      span:last-child {
        transform: translateY(-3.5px) rotate(-45deg);
      }
    `}

  ${media.tablet} {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
