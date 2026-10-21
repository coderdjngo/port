import styled from "styled-components";
import { Container } from "../../components/common/Container";
import { media } from "../../styles/media";
import { serif } from "../../styles/mixins";

export const Layout = styled(Container)`
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  align-items: center;
  gap: clamp(35px, 8vw, 145px);

  ${media.tablet} {
    gap: 35px;
  }
  ${media.mobile} {
    grid-template-columns: 0.8fr 1.2fr;
    gap: 20px;
  }
  ${media.small} {
    grid-template-columns: 1fr 1.2fr;
  }
`;

export const Photo = styled.figure`
  position: relative;
  isolation: isolate;
  height: clamp(320px, 67vh, 700px);
  overflow: hidden;
  border-radius: 300px 300px 0 0;
  background: #bed0da;

  ${media.mobile} {
    height: 45vh;
  }
  ${media.small} {
    height: 40vh;
  }
  ${media.xsmall} {
    height: 38vh;
  }
  ${media.tiny} {
    height: 36vh;
  }
  ${media.short} {
    height: 52vh;
  }
  ${media.shorter} {
    height: 45vh;
  }
`;

export const Content = styled.div`
  > p {
    font-size: clamp(13px, 1.25vw, 17px);
    line-height: 1.9;
    color: ${({ theme }) => theme.tone.muted};
  }

  ${media.mobile} {
    > p {
      font-size: 12px;
      line-height: 1.7;
    }
  }
  ${media.xsmall} {
    > p {
      font-size: 11px;
    }
  }
  ${media.shorter} {
    > p {
      font-size: 11px;
      line-height: 1.4;
    }
  }
`;

export const Name = styled.h2`
  ${serif};
  margin: 20px 0 30px;
  font-size: clamp(64px, 9vw, 145px);
  line-height: 0.98;
  letter-spacing: -0.035em;

  ${media.tablet} {
    font-size: clamp(55px, 9vw, 90px);
  }
  ${media.mobile} {
    margin: 14px 0;
    font-size: clamp(47px, 9vw, 75px);
  }
  ${media.small} {
    font-size: clamp(40px, 9vw, 58px);
  }
  ${media.tiny} {
    font-size: 38px;
  }
`;

export const Details = styled.dl`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #b3c5cf;

  dt {
    font-size: 10px;
    letter-spacing: 0.15em;
    color: #7f97a6;
  }

  dd {
    margin-top: 10px;
    font-size: 14px;
    font-weight: 500;
  }

  ${media.mobile} {
    margin-top: 17px;
    padding-top: 13px;

    dd {
      font-size: 12px;
    }
  }
  ${media.small} {
    grid-template-columns: 1fr;
    gap: 6px;
  }
`;
