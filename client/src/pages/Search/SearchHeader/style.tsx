import styled, { css } from "styled-components";

export const SHeader = styled.header`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  row-gap: 20px;
  margin-bottom: 40px;
`;

export const SP = styled.p<{ showWarning: boolean }>`
  display: flex;
  align-items: center;
  color: white;
  font-weight: bold;
  height: 0;
  overflow: hidden;
  transition: 400ms all;

  ${({ showWarning }) =>
    showWarning &&
    css`
      color: #f85a5a;
      height: 20px;
    `}
`;
