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
  grid-template-columns: 100px 1fr 185px 30px;
  gap: 22px;
  align-items: center;
  padding: clamp(17px, 3vh, 32px) 0;
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
    font-size: clamp(26px, 3.5vw, 53px);
    transition: transform 0.5s ${({ theme }) => theme.ease};
  }

  &:hover h3 {
    transform: translateX(14px);
  }

  ${media.mobile} {
    grid-template-columns: 60px 1fr 20px;
    gap: 10px;
  }
  ${media.xsmall} {
    padding: 20px 0;

    h3 {
      font-size: clamp(26px, 6vw, 39px);
    }
  }
  ${media.shorter} {
    padding: 10px 0;
  }
`;

export const Year = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.sky};
`;

export const Place = styled.p`
  font-size: 12px;
  line-height: 1.6;
  color: ${({ theme }) => theme.tone.muted};

  ${media.mobile} {
    grid-column: 2;
    grid-row: 2;
  }
`;

export const Arrow = styled.span`
  font-size: 23px;
  text-align: right;

  ${media.mobile} {
    grid-column: 3;
    grid-row: 1 / 3;
  }
`;
