import styled, { css } from "styled-components";

import { colors, mobile, tablet } from "../../assets";
import { ButtonOrange } from "../Form";

export const FormBreakPoint = "906px";

export const SForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  margin: 55px 15px;
`;

export const SBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  row-gap: 25px;
  margin-bottom: 20px;
`;

export const SH1 = styled.h1`
  align-self: flex-start;
  height: max-content;
  font-size: 40px;
  line-height: 3rem;
  padding-bottom: 5px;
  color: ${colors("black300")};
  border-bottom: 1px solid ${colors("black050")};

  ${tablet(css`
    font-size: 30px;
    line-height: 2.5rem;
  `)}

  ${mobile(css`
    font-size: 23px;
    line-height: 2rem;
  `)}
`;

export const SPostSection = styled.section`
  width: 100%;
  row-gap: 25px;
  display: flex;
  flex-flow: row wrap;

  @media screen and (max-width: ${FormBreakPoint}) {
    flex-direction: column-reverse;
  }
`;

export const SEditorBox = styled.div`
  width: 70%;

  @media screen and (max-width: ${FormBreakPoint}) {
    width: 100%;
  }
`;

export const SButton = styled(ButtonOrange)`
  width: 125px;
  height: 47px;
  font-size: 19px;
  border-radius: 30px;
`;
