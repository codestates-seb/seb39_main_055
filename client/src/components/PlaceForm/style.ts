import styled from "styled-components";

import { ButtonOrange } from "../Form/Button/Template";

export const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 380px);
  margin: 100px 0;

  & > h1 {
    font-size: 42px;
    color: #161616;
  }
`;

export const SForm = styled.form`
  display: flex;
  gap: 50px;
  width: 100%;
  margin-top: 50px;
  padding: 100px 100px 50px 50px;
  border: 1px solid #dbdbdb;

  & > section:first-child {
    flex-basis: 30%;
  }

  & > section:last-child {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 50px;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.tablet}) {
    flex-direction: column;
    width: 90%;
    padding: 20px;
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
    flex-basis: 70%;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;

    & > section > div {
      flex-basis: 40%;
      flex-grow: 1;
    }
  }
`;

export const SButton = styled(ButtonOrange)`
  width: 150px;
  border-radius: 25px;
  margin-left: 130px;
  padding: 0 30px;

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.tablet}) {
    margin: 0 auto;
  }
`;
