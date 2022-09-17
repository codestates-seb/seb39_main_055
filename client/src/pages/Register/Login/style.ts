import { BiHide, BiShow } from "react-icons/bi";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

import { colors, mobile } from "../../../assets";
import {
  ButtonOrange,
  ButtonWhite,
  Checkbox,
  Input,
} from "../../../components/Form";

export const SBox = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  height: 1000px;

  ${mobile(css`
    width: 100vw;
    height: 800px;
  `)}
`;

export const SH1 = styled.h1`
  font-size: 42px;
  padding: 20px;
`;

export const SLoginSection = styled.section`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  width: 450px;
  height: 600px;
  padding: 50px 60px;
  border: 1px solid ${colors("black050")};

  ${mobile(css`
    width: 80%;
    min-width: 280px;
    padding: 30px;
    height: 460px;
  `)}
`;

export const SForm = styled.form`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  height: 240px;
  width: 100%;
  row-gap: 35px;

  ${mobile(css`
    row-gap: 25px;
  `)}
`;

export const SInput = styled(Input)`
  width: 100%;
  height: 40px;

  & > div {
    height: 100%;
  }

  & input {
    height: 100%;
    font-size: 16px;

    &::placeholder {
      font-size: 16px;
    }
  }
`;

export const SPWBox = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
`;

export const SPWInput = styled(SInput)``;

export const SButton = styled.button`
  width: 60px;
  height: 22px;
  position: absolute;
  top: 50%;
  right: -30px;
  transform: translate(-50%, -52%);
  border: 0px;
  padding: 0px;
  background-color: rgba(0, 0, 0, 0);
`;

export const IconDefault = css`
  width: 100%;
  height: 100%;
  fill: rgba(0, 0, 0, 0);
  transition: 1s all;
  padding: 0px 20px 0px 10px;

  &:hover {
    fill: ${colors("black250")};
    background-color: white;
  }
`;

export const ShowSVG = styled(BiShow)`
  ${IconDefault}
`;
export const HideSVG = styled(BiHide)`
  ${IconDefault}
`;

export const SMiscBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 14px;
  margin-top: -20px;

  ${mobile(css`
    margin-top: -10px;
    flex-flow: column wrap;
    row-gap: 15px;
  `)}
`;

export const SCheckbox = styled(Checkbox)`
  & > label {
    font-size: 14px;
  }
`;

export const SLink = styled(Link)`
  color: ${colors("black250")};
  margin-top: 2px;
`;

export const SLoginButton = styled(ButtonOrange)`
  width: 100%;
  max-width: 350px;
`;

export const SSignupButton = styled(ButtonWhite)`
  width: 100%;
  max-width: 350px;
`;
