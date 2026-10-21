import styled from "styled-components";
import { media } from "../../../styles/media";
import { Label } from "../Typography";

export const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 25px;
  margin-bottom: ${({ $compact }) => ($compact ? "25px" : "clamp(25px, 4vh, 50px)")};

  ${media.mobile} {
    display: block;
    margin-bottom: 24px;
  }
  ${media.short} {
    margin-bottom: 15px;
  }
`;

export const HeadLabel = styled(Label)`
  margin-bottom: 15px;

  ${media.xsmall} {
    margin-bottom: 10px;
  }
`;

export const Description = styled.p`
  max-width: 290px;
  color: ${({ theme }) => theme.tone.muted};
  font-size: 13px;
  line-height: 1.85;

  ${media.mobile} {
    margin-top: 12px;
    font-size: 12px;
    line-height: 1.6;
  }
  ${media.shorter} {
    display: none;
  }
`;
