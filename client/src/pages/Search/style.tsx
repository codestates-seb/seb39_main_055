import styled, { css } from "styled-components";

import { mobile, tablet } from "../../assets";

export const SBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  row-gap: 20px;
  margin-bottom: 100px;
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

export const SUList = styled.ul`
  display: grid;
  width: calc(100% - 40px);
  height: max-content;
  justify-items: center;
  align-content: center;
  column-gap: 40px;
  row-gap: 60px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  margin: 20px;
`;

export const SBottomBox = styled.div`
  height: 10px;
  width: 100%;
`;
