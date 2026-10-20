import styled from "styled-components";

export const Container = styled.div`
  width: calc(100% - ${({ theme }) => theme.layout.side} * 2);
  max-width: ${({ theme }) => theme.layout.maxWidth};
  min-height: 0;
  margin: 0 auto;
`;
