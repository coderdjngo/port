import styled from "styled-components";
import { media } from "../../styles/media";
import { serif } from "../../styles/mixins";

export const List = styled.ul`
  border-top: 1px solid ${({ theme }) => theme.tone.line};
`;

export const Row = styled.li`
  position: relative;
  isolation: isolate;
  display: grid;
  grid-template-columns: 80px 1fr 30px;
  gap: 10px 18px;
  align-items: start;
  padding: clamp(10px, 1.6vh, 18px) 0;
  overflow: hidden;
  border-bottom: 1px solid ${({ theme }) => theme.tone.line};

  /* hover: 아래에서 물이 차오르듯 배경이 채워진다 */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background: linear-gradient(0deg, rgba(164, 212, 239, 0.16), rgba(164, 212, 239, 0.02));
    transform: translateY(101%);
    transition: transform 0.7s ${({ theme }) => theme.ease};
  }

  &:hover::before {
    transform: translateY(0);
  }

  h3 {
    ${serif};
    font-size: clamp(22px, 2.3vw, 34px);
    line-height: 1.15;
    transition: transform 0.5s ${({ theme }) => theme.ease};
  }

  &:hover h3 {
    transform: translateX(14px);
  }

  ${media.mobile} {
    grid-template-columns: 55px 1fr 20px;
    gap: 7px 10px;

    h3 {
      font-size: clamp(18px, 4vw, 25px);
    }
  }
  ${media.xsmall} {
    padding: 8px 0;
  }
  ${media.shorter} {
    padding: 6px 0;
  }
`;

export const Year = styled.span`
  grid-row: 1 / 3;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.sky};

  ${media.mobile} {
    font-size: 10px;
  }
`;

export const Place = styled.p`
  grid-column: 2;
  grid-row: 2;
  font-size: 12px;
  line-height: 1.45;
  color: ${({ theme }) => theme.tone.muted};

  ${media.mobile} {
    font-size: 10px;
  }
`;

export const Arrow = styled.span`
  grid-column: 3;
  grid-row: 1 / 3;
  font-size: 23px;
  text-align: right;
`;
