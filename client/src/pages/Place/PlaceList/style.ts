import styled, { css } from "styled-components";

import { tablet } from "../../../assets";

export const SBox = styled.div`
  ${tablet(css`
    margin-bottom: 70px;
  `)}
`;

export const SH1 = styled.h1`
  font-size: 32px;
  margin: 60px 0px 40px 0px;
`;
