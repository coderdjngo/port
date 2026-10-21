import { css } from "styled-components";

export const serif = css`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-weight: 400;
`;

export const labelText = css`
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.21em;
  text-transform: uppercase;
`;

export const coverLayer = css`
  position: absolute;
  inset: 0;
`;

export const circleButton = (size) => css`
  width: ${size}px;
  height: ${size}px;
  border-radius: 50%;
  display: grid;
  place-items: center;
`;
