import styled from "styled-components";
import { media } from "../../../styles/media";
import { circleButton, serif } from "../../../styles/mixins";
import { tones } from "../../../styles/theme";
import { Label } from "../../common/Typography";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: #020b14ed;
  backdrop-filter: blur(15px);
`;

export const Dialog = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  width: min(1050px, 100%);
  max-height: 92dvh;
  overflow: auto;
  background: #edf2f5;
  color: #102f43;

  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

export const Photo = styled.div`
  min-height: 350px;
  overflow: hidden;
  background: #36546b;

  img {
    max-height: 92dvh;
  }

  ${media.mobile} {
    min-height: 0;
    height: 35dvh;

    img {
      max-height: none;
    }
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(28px, 5vw, 70px);

  ${media.mobile} {
    padding: 25px;
  }
`;

export const Title = styled.h2`
  ${serif};
  margin: 24px 0;
  font-size: clamp(42px, 5vw, 80px);

  ${media.mobile} {
    margin: 12px 0;
    font-size: 43px;
  }
`;

export const Description = styled.p`
  font-size: 14px;
  line-height: 1.9;
  color: #5e7b8f;
`;

export const Meta = styled.div`
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #b6c8d2;

  p {
    font-size: 12px;
    line-height: 2;
    color: #648092;
  }
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 30px;
`;

export const StepButton = styled.button`
  ${circleButton(43)};
  border: 1px solid #a5bac9;
  font-size: 23px;
`;

export const Counter = styled.span`
  font-size: 11px;
  letter-spacing: 0.15em;
`;

export const CloseButton = styled.button`
  ${circleButton(44)};
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 2;
  background: #102d42;
  color: #fff;
  font-size: 27px;
`;

export const Category = styled(Label)`
  color: ${tones.light.accent};
`;
