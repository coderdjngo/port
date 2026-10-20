import { createGlobalStyle } from "styled-components";
import { media } from "./media";

export const GlobalStyle = createGlobalStyle`
  :root {
    --side: clamp(20px, 5vw, 90px);
    --header: 78px;

    ${media.mobile} {
      --side: 22px;
      --header: 68px;
    }

    ${media.tiny} {
      --side: 16px;
    }
  }

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
    overflow: hidden;
    overscroll-behavior: none;
  }

  body {
    background: ${({ theme }) => theme.colors.navy};
    color: ${({ theme }) => theme.colors.white};
    font-family: ${({ theme }) => theme.fonts.sans};
    -webkit-font-smoothing: antialiased;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    background: none;
    border: 0;
    color: inherit;
    font: inherit;
    cursor: pointer;
  }

  a, button {
    -webkit-tap-highlight-color: transparent;
  }

  a:focus-visible, button:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.sky};
    outline-offset: 4px;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ul {
    list-style: none;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.sky};
    color: ${({ theme }) => theme.colors.navy};
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: .01ms !important;
      transition-duration: .01ms !important;
    }
  }
`;
