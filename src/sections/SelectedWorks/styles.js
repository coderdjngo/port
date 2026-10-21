import styled, { css } from "styled-components";
import { waterFilterUrl } from "../../components/effects/WaterFilter";
import { media } from "../../styles/media";
import { serif } from "../../styles/mixins";

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: clamp(18px, 4vw, 65px);
  align-items: end;

  ${media.mobile} {
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }
`;

export const FeatureCard = styled.button`
  display: block;
  width: 100%;
  color: inherit;
  text-align: left;
`;

const sizes = {
  large: css`
    height: clamp(220px, 45vh, 520px);
    border-radius: 0 140px 0 0;

    ${media.mobile} {
      height: 39vh;
      border-top-right-radius: 70px;
    }
    ${media.small} {
      height: 37vh;
    }
    ${media.xsmall} {
      height: 35vh;
    }
    ${media.short} {
      height: 38vh;
    }
    ${media.shorter} {
      height: 32vh;
    }
  `,
  small: css`
    height: clamp(190px, 33vh, 385px);
    border-radius: 0 0 0 130px;

    ${media.mobile} {
      height: 29vh;
      border-bottom-left-radius: 70px;
    }
    ${media.small} {
      height: 27vh;
    }
    ${media.xsmall} {
      height: 25vh;
    }
    ${media.short} {
      height: 28vh;
    }
    ${media.shorter} {
      height: 25vh;
    }
  `,
};

export const FeatureImage = styled.figure`
  position: relative;
  overflow: hidden;
  background: #a4bbcb;
  ${({ $size }) => sizes[$size]};

  img {
    transition: transform 0.85s ${({ theme }) => theme.ease};
  }

  &:hover img {
    transform: scale(1.06);
    filter: ${waterFilterUrl};
  }
`;

export const Tag = styled.span`
  position: absolute;
  top: 18px;
  left: 18px;
  padding: 11px 16px;
  border: 1px solid #ffffff90;
  border-radius: 25px;
  background: #0720387a;
  color: #fff;
  backdrop-filter: blur(8px);
  font-size: 10px;
  letter-spacing: 0.12em;

  ${media.xsmall} {
    top: 9px;
    left: 9px;
    padding: 7px 10px;
    font-size: 8px;
  }
`;

export const Caption = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid ${({ theme }) => theme.tone.line};

  h3 {
    ${serif};
    font-size: clamp(25px, 3vw, 45px);
  }

  p {
    font-size: 10px;
    letter-spacing: 0.1em;
    color: #617d8f;
    text-align: right;
  }

  ${media.mobile} {
    display: block;

    h3 {
      font-size: clamp(24px, 5vw, 35px);
    }
    p {
      margin-top: 8px;
      text-align: left;
    }
  }
  ${media.xsmall} {
    h3 {
      font-size: 24px;
    }
  }
`;
