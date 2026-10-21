import styled from "styled-components";
import { coverLayer } from "../../../styles/mixins";

export const Wrapper = styled.div`
  ${coverLayer};
  z-index: -2;
  overflow: hidden;
`;

export const FallbackImage = styled.img`
  ${coverLayer};
  transform: scale(1.04);
`;

export const Canvas = styled.canvas`
  ${coverLayer};
  width: 100%;
  height: 100%;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 1.2s ease;
`;
