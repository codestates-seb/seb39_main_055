import styled from "styled-components";

import { ButtonOrange } from "../../../components";

export const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  min-height: calc(100vh - 380px);

  & > h1 {
    font-size: 42px;
  }

  & > form {
    display: flex;
    flex-direction: column;
    gap: 60px;
    width: 50%;
    padding: 60px;
    border: 1px solid lightgray;
    /* box-shadow: 0px 0px 5px grey; */
  }

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.tablet}) {
    & > form {
      gap: 50px;
      width: 80%;
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

export const SCheckboxContainer = styled.div`
  display: flex;
  align-items: center;

  & > span {
    flex-basis: 30%;
    color: #464646;
    font-size: 16px;
    cursor: pointer;
  }

  & > section {
    display: flex;
    gap: 30px;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;

    & > section {
      width: 100%;
      justify-content: space-between;
    }
  }
`;

export const SButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const SButton = styled(ButtonOrange)`
  width: 80%;

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.tablet}) {
    width: 100%;
  }
`;
