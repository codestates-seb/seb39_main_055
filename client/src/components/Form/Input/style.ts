import styled from "styled-components";

export const SInputContainer = styled.div`
  display: flex;
  align-items: center;

  & > label {
    flex-basis: 30%;
    color: #161616;
    font-size: 18px;
    cursor: pointer;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
`;

export const SInput = styled.div<{
  isLabel: string | undefined;
  isSideButton: JSX.Element | undefined;
}>`
  position: relative;
  flex-basis: ${({ isLabel }) => (isLabel ? "70%" : "100%")};
  border-bottom: 1px solid #707070;

  & > input {
    width: ${({ isSideButton }) => (isSideButton ? "70%" : "100%")};
    /* width: 100%; */
    padding: 5px;
    border: none;
    font-size: 16px;
    outline: none;
    overflow: auto;
  }

  & > input::placeholder {
    font-size: 16px;
    color: #dbdbdb;
  }

  & > button {
    position: absolute;
    right: 0;
    bottom: 5px;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.tablet}) {
    width: 100%;

    & > input {
      padding: 5px 0;
      width: ${({ isSideButton }) => (isSideButton ? "70%" : "100%")};
    }
  }
`;

export const SError = styled.p<{ isError: boolean }>`
  display: ${({ isError }) => (isError ? "block" : "none")};
  position: absolute;
  top: 35px;
  left: 5px;
  color: #f53a3a;
  font-size: 12px;

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.tablet}) {
    left: 0;
  }
`;

export const SComment = styled.p<{ isError: boolean }>`
  display: ${({ isError }) => (isError ? "none" : "block")};
  position: absolute;
  top: 35px;
  left: 5px;
  color: #707070;
  font-size: 12px;

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.tablet}) {
    left: 0;
  }
`;
