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
