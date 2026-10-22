import styled from "styled-components";
import { media } from "../../../styles/media";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(15px, 3vw, 45px);

  ${media.mobile} {
    gap: 12px;
  }
  ${media.small} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;
