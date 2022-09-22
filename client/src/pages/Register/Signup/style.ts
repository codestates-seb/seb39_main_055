import styled, { css } from "styled-components";

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

// export const SCheckboxContainer = styled.div`
//   display: flex;
//   align-items: center;

//   & > span {
//     flex-basis: 30%;
//     color: #464646;
//     font-size: 16px;
//     cursor: pointer;
//   }

//   & > section {
//     display: flex;
//     gap: 30px;
//   }

//   @media screen and (max-width: ${({ theme }) => theme.breakPoints.tablet}) {
//     flex-direction: column;
//     align-items: flex-start;
//     gap: 15px;

//     & > section {
//       width: 100%;
//       justify-content: space-between;
//     }
//   }
// `;

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
