import { BiHide, BiShow } from "react-icons/bi";
import styled, { css } from "styled-components";

import { colors } from "../../../assets";
import { ButtonOrange } from "../../../components";

export const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 100px 0;
  min-height: calc(100vh - 380px);

  & > h1 {
    margin-bottom: 64px;
    color: #161616;
    font-size: 32px;
  }

  & > form {
    display: flex;
    flex-direction: column;
    gap: 60px;
    width: 100%;
    max-width: 660px;
    padding: 100px 60px;
    border: 1px solid #dbdbdb;
    border-radius: 0 0 10px 10px;
    font-family: "Noto Sans KR", sans-serif;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.tablet}) {
    & > div {
      width: 90%;
    }

    & > form {
      width: 90%;
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.mobile}) {
    margin: 50px 0;

    & > h1 {
      font-size: 21px;
    }

    & > form {
      padding: 25px;
    }
  }
`;

export const SRole = styled.div<{ isGuest: boolean }>`
  display: flex;
  width: 100%;
  height: 50px;
  max-width: 660px;
  color: #161616;
  font-size: 16px;

  & > div {
    border: 1px solid #dbdbdb;
    border-bottom: none;
    border-radius: 10px 10px 0 0;
    flex-basis: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.4s;
  }

  & > div:first-child {
    ${({ isGuest }) =>
      !isGuest &&
      css`
        background-color: #ffc107;
        border-color: #ffc107;
      `}
  }

  & > div:last-child {
    ${({ isGuest }) =>
      isGuest &&
      css`
        background-color: #ffc107;
        border-color: #ffc107;
      `}
  }
`;

export const SButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 30px;
`;

export const SButton = styled(ButtonOrange)`
  width: 80%;

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.tablet}) {
    width: 100%;
  }
`;

export const SPWBox = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
`;

export const IconDefault = css`
  width: 28px;
  height: 28px;
  fill: ${colors("black250")};
  transition: 1s all;
  padding: 0px;
`;

export const SHideButton = styled.button`
  width: 30px;
  height: 22px;
  position: absolute;
  top: 10px;
  right: -10px;
  transform: translate(-50%, -52%);
  border: 0px;
  padding: 0px;
  background-color: rgba(0, 0, 0, 0);
`;

export const ShowSVG = styled(BiShow)`
  ${IconDefault}
`;
export const HideSVG = styled(BiHide)`
  ${IconDefault}
`;
