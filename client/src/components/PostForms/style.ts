import styled, { css } from "styled-components";

import { colors, mobile, tablet } from "../../assets";
import { ButtonOrange } from "../Form";

export const SForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  row-gap: 25px;
  height: 1050px;
`;

export const SBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 80vw;
`;

export const SPostSection = styled.section`
  width: 70%;
  row-gap: 30px;
  display: flex;
  flex-flow: column nowrap;
`;

export const SH1 = styled.h1`
  align-self: flex-start;
  height: max-content;
  font-size: 42px;
  line-height: 3rem;
  padding-bottom: 5px;
  color: ${colors("black300")};
  border-bottom: 1px solid ${colors("black050")};

  ${tablet(css`
    font-size: 30px;
  `)}

  ${mobile(css`
    font-size: 25px;
  `)}
`;

export const Button = styled(ButtonOrange)`
  width: 125px;
  height: 47px;
  font-size: 19px;
  border-radius: 30px;
`;
