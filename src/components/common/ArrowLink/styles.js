import styled from "styled-components";

export const StyledArrowLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 25px;
  padding-bottom: 12px;
  border-bottom: 1px solid currentColor;
  font-size: 11px;
  letter-spacing: 0.14em;
  transition: gap 0.3s;

  &:hover {
    gap: 40px;
  }
`;
