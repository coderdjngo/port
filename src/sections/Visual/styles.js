import styled from "styled-components";
import { media } from "../../styles/media";
import { coverLayer, serif } from "../../styles/mixins";

export const Overlay = styled.div`
  ${coverLayer};
  z-index: -1;
  pointer-events: none;
  background: radial-gradient(ellipse at center, #04182b80 0%, #04182bd0 75%);
`;

export const Content = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 ${({ theme }) => theme.layout.side};
  text-align: center;
  pointer-events: none;
`;

export const Title = styled.h2`
  ${serif};
  margin: 35px 0;
  font-size: clamp(49px, 8vw, 125px);
  line-height: 1.15;

  ${media.xsmall} {
    font-size: clamp(43px, 11vw, 67px);
  }
`;
