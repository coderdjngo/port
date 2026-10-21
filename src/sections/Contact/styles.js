import styled from "styled-components";
import { media } from "../../styles/media";
import { serif } from "../../styles/mixins";

export const Title = styled.h2`
  ${serif};
  margin: 28px 0 clamp(35px, 7vh, 75px);
  font-size: clamp(78px, 15vw, 230px);
  line-height: 0.98;
  letter-spacing: -0.055em;

  span {
    color: ${({ theme }) => theme.colors.sky};
  }

  ${media.mobile} {
    font-size: clamp(67px, 14vw, 125px);
  }
  ${media.xsmall} {
    font-size: clamp(65px, 15vw, 90px);
  }
  ${media.shorter} {
    font-size: clamp(58px, 12vh, 120px);
  }
`;

export const Bottom = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 30px;

  p {
    max-width: 370px;
    font-size: 15px;
    line-height: 1.85;
    color: ${({ theme }) => theme.tone.muted};
  }

  ${media.mobile} {
    flex-direction: column;
    align-items: start;
  }
  ${media.xsmall} {
    p {
      font-size: 13px;
    }
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: clamp(16px, 3vw, 42px);
`;

export const SocialLink = styled.a`
  padding-bottom: 12px;
  border-bottom: 1px solid #b1d1e6;
  font-size: clamp(16px, 2.3vw, 30px);
  overflow-wrap: anywhere;
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.sky};
  }

  ${media.small} {
    font-size: 17px;
  }
`;

export const Footer = styled.footer`
  position: absolute;
  bottom: 30px;
  left: ${({ theme }) => theme.layout.side};
  font-size: 10px;
  letter-spacing: 0.13em;
  color: #91aabb;
`;
