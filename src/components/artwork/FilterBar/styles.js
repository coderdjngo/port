import styled, { css } from "styled-components";
import { media } from "../../../styles/media";

export const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin-bottom: clamp(15px, 3vh, 30px);

  ${media.mobile} {
    gap: 6px;
    margin-bottom: 18px;
  }
  ${media.short} {
    margin-bottom: 10px;
  }
`;

const activeStyle = css`
  background: #d8eefa;
  color: #0b2c42;
`;

export const FilterButton = styled.button`
  position: relative;
  overflow: hidden;
  padding: 11px 17px;
  border: 1px solid #ffffff4c;
  border-radius: 30px;
  font-size: 10px;
  letter-spacing: 0.1em;
  transition:
    background 0.3s,
    color 0.3s;

  &:hover {
    ${activeStyle};
  }

  ${({ $active }) => $active && activeStyle};

  ${media.mobile} {
    padding: 9px 12px;
    font-size: 9px;
  }
`;
