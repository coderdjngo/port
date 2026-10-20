import styled from "styled-components";
import { media } from "../../styles/media";
import { labelText, serif } from "../../styles/mixins";

export const Label = styled.span`
  ${labelText};
  display: block;
  color: ${({ $accent, theme }) => ($accent ? theme.tone.accent : "inherit")};
`;

export const Accent = styled.em`
  font-style: normal;
  color: ${({ theme }) => theme.colors.sky};
`;

export const SectionTitle = styled.h2`
  ${serif};
  font-size: clamp(60px, 9vw, 142px);
  line-height: 0.98;
  letter-spacing: -0.045em;

  ${media.laptop} {
    font-size: clamp(55px, 8vw, 105px);
  }
  ${media.mobile} {
    font-size: clamp(48px, 10vw, 78px);
  }
  ${media.xsmall} {
    font-size: clamp(49px, 11vw, 65px);
  }
  ${media.short} {
    font-size: clamp(42px, 7vh, 82px);
  }
`;
