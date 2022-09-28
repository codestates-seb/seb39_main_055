import styled, { css } from "styled-components";

import { mobile, tablet } from "../../assets";

export const SBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  row-gap: 20px;
`;

export const SHeader = styled.header`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  row-gap: 20px;
  margin-bottom: 40px;
`;

export const SH1 = styled.h1`
  font-size: 34px;
  line-height: 3.5rem;
  text-align: center;
  word-break: break-all;
  margin: 50px 0px;
  padding: 0px 30px;

  ${tablet(css`
    font-size: 30px;
  `)}

  ${mobile(css`
    font-size: 25px;
    margin: 10px;
  `)}
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

export const SSpan = styled.span`
  display: inline-block;
  font-weight: normal;
  margin-left: 5px;
  color: #7a7a7a;
`;

export const SUList = styled.ul`
  display: grid;
  width: calc(100% - 40px);
  height: max-content;
  justify-items: center;
  align-content: center;
  column-gap: 40px;
  row-gap: 60px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  margin: 20px;
`;
