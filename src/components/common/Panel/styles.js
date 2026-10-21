import styled, { css } from "styled-components";
import { media } from "../../../styles/media";

export const PanelSection = styled.section`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100dvh;
  overflow: hidden;
  isolation: isolate;
  will-change: transform, clip-path;
  visibility: ${({ $visible }) => ($visible ? "visible" : "hidden")};
  z-index: ${({ $layer }) => $layer};
  color: ${({ theme }) => theme.tone.text};
  background: ${({ $background, $tone, theme }) =>
    $background ?? ($tone === "light" ? theme.colors.cream : theme.colors.navy)};
`;

/** 헤더 높이를 피해 콘텐츠를 세로 중앙 정렬하는 내부 래퍼 */
export const PanelInner = styled.div`
  width: 100%;
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: calc(${({ theme }) => theme.layout.header} + 30px) 0 55px;

  ${media.mobile} {
    padding: calc(${({ theme }) => theme.layout.header} + 22px) 0 60px;
  }

  ${media.short} {
    padding-top: calc(${({ theme }) => theme.layout.header} + 12px);
    padding-bottom: 45px;
  }

  ${({ $centered }) =>
    $centered &&
    css`
      align-items: center;
      text-align: center;
    `}
`;
