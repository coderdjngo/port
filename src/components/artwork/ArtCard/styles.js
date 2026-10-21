import styled from "styled-components";
import { media } from "../../../styles/media";
import { circleButton, serif } from "../../../styles/mixins";
import { waterFilterUrl } from "../../effects/WaterFilter";


export const CARD_SHAPES = ["0 105px 0 0", "110px 110px 0 0", "0 0 0 105px"];

export const MoreIcon = styled.span`
  ${circleButton(42)};
  position: absolute;
  right: 15px;
  bottom: 15px;
  background: #e4f4fb;
  color: ${({ theme }) => theme.colors.ink};
  font-size: 23px;
  opacity: 0;
  transform: translateY(8px);
  transition: 0.3s;

  ${media.mobile} {
    width: 32px;
    height: 32px;
    right: 8px;
    bottom: 8px;
    font-size: 18px;
    opacity: 1;
    transform: none;
  }
`;

export const CardImage = styled.div`
  position: relative;
  height: clamp(190px, 37vh, 435px);
  overflow: hidden;
  border-radius: ${({ $shape }) => $shape};
  background: #204057;

  img {
    transition: transform 0.9s ${({ theme }) => theme.ease};
  }

  ${media.laptop} {
    height: clamp(170px, 34vh, 350px);
  }
  ${media.mobile} {
    height: clamp(145px, 28vh, 290px);
    border-radius: 0 55px 0 0;
  }
  ${media.small} {
    height: clamp(170px, 30vh, 280px);
  }
  ${media.xsmall} {
    height: clamp(170px, 29vh, 270px);
  }
  ${media.tiny} {
    height: 25vh;
  }
  ${media.short} {
    height: 27vh;
  }
  ${media.shorter} {
    height: 23vh;
  }
`;

export const Card = styled.button`
  display: block;
  width: 100%;
  min-width: 0;
  text-align: left;

  /* hover: 이미지가 수면 아래 비친 것처럼 일렁인다 */
  &:hover img {
    transform: scale(1.09);
    filter: ${waterFilterUrl};
  }

  &:hover ${MoreIcon}, &:focus-visible ${MoreIcon} {
    opacity: 1;
    transform: none;
  }

  ${media.small} {
    &:nth-child(n + 3) {
      display: none;
    }
  }
`;

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding-top: 13px;

  ${media.mobile} {
    display: block;
  }
`;

export const Title = styled.h3`
  ${serif};
  font-size: clamp(23px, 2.8vw, 41px);

  ${media.mobile} {
    font-size: clamp(18px, 3.6vw, 28px);
  }
  ${media.small} {
    font-size: clamp(22px, 5vw, 32px);
  }
  ${media.tiny} {
    font-size: 20px;
  }
`;

export const Medium = styled.p`
  margin-top: 8px;
  font-size: 10px;
  letter-spacing: 0.12em;
  color: #a3bac9;

  ${media.mobile} {
    font-size: 9px;
  }
`;

export const Year = styled.span`
  font-size: 11px;
  color: #b0c5d2;

  ${media.mobile} {
    display: none;
  }
`;
