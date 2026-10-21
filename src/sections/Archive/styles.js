import styled from "styled-components";

export const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  margin-top: 20px;
  font-size: 10px;
  letter-spacing: 0.15em;
  color: ${({ theme }) => theme.tone.muted};
`;

export const PageLink = styled.a`
  padding-bottom: 6px;
  border-bottom: 1px solid currentColor;
  font-size: 14px;
  letter-spacing: 0.06em;
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.sky};
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;
