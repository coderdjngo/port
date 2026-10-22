import styled, { keyframes } from "styled-components";
import { Label } from "../../components/common/Typography";
import { media } from "../../styles/media";
import { coverLayer, serif } from "../../styles/mixins";

const drip = keyframes`
  from { transform: translateY(-100%); }
  to { transform: translateY(100%); }
`;

export const Overlay = styled.div`
  ${coverLayer};
  z-index: -1;
  pointer-events: none;
  background:
    linear-gradient(90deg, #061725ad, transparent 75%),
    linear-gradient(0deg, #041421b5, transparent 50%);
`;

export const Content = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.layout.side};
  right: ${({ theme }) => theme.layout.side};
  bottom: clamp(125px, 17vh, 200px);
  pointer-events: none;

  ${media.mobile} {
    bottom: 135px;
  }
  ${media.shorter} {
    bottom: 95px;
  }
`;

export const Kicker = styled(Label)`
  display: flex;
  align-items: center;
  gap: 15px;

  &::before {
    content: "";
    width: 35px;
    height: 1px;
    background: #fff;
  }

  ${media.xsmall} {
    font-size: 9px;
  }
`;

export const Title = styled.h1`
  ${serif};
  margin: 24px 0;
  font-size: clamp(68px, 13.3vw, 230px);
  line-height: 1;
  letter-spacing: -0.06em;
  text-shadow: 0 10px 50px rgba(2, 16, 28, 0.35);

  ${media.mobile} {
    font-size: clamp(59px, 12vw, 105px);
    line-height: 1.04;
  }
  ${media.small} {
    font-size: clamp(62px, 13.5vw, 85px);
  }
  ${media.xsmall} {
    font-size: clamp(59px, 13.5vw, 76px);
  }
  ${media.tiny} {
    font-size: 55px;
  }
  ${media.shorter} {
    font-size: clamp(48px, 10vh, 100px);
  }
`;

export const Sub = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 20px;

  p {
    font-size: 15px;
    line-height: 1.8;
  }

  span {
    font-size: 11px;
    letter-spacing: 0.2em;
  }

  ${media.mobile} {
    p {
      font-size: 13px;
    }
    span {
      display: none;
    }
  }
`;

export const ScrollHint = styled.div`
  position: absolute;
  bottom: 40px;
  left: ${({ theme }) => theme.layout.side};
  display: flex;
  align-items: center;
  gap: 13px;
`;

export const ScrollLine = styled.span`
  position: relative;
  width: 1px;
  height: 35px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.sky};

  &::after {
    content: "";
    ${coverLayer};
    background: #fff;
    animation: ${drip} 1.9s infinite;
  }
`;

export const Interaction = styled.span`
  position: absolute;
  top: calc(${({ theme }) => theme.layout.header} + 28px);
  right: calc(${({ theme }) => theme.layout.side} + 40px);
  font-size: 10px;
  letter-spacing: 0.22em;
  color: #ffffffb0;

  ${media.mobile} {
    display: none;
  }
`;

export const Curve = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: clamp(100px, 17vw, 260px);
  aspect-ratio: 1;
  border-radius: 100% 0 0 0;
  border-top: 1px solid #ffffff75;
  border-left: 1px solid #ffffff75;
  pointer-events: none;
`;
