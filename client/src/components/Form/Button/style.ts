import styled, { css, keyframes } from "styled-components";

import { colors } from "../../../assets";
import { ButtonProps } from "./DefaultButton";

export const Buttton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  border: 0px;
  padding: 2px 9px;
  transition: 0.4s all;
  font-size: 1.2rem;
  font-weight: bold;
  width: max-content;
  height: 55px;

  ${({ bgColor, hoverColor, textColor = "white" }: ButtonProps) =>
    css`
      background-color: ${bgColor || colors("orange500")};
      color: ${textColor};
      border: 1px solid ${bgColor || colors("orange500")};

      &:hover {
        background-color: ${hoverColor || "white"};
        color: ${bgColor || colors("orange500")};
        transition: 0.4s all;
      }

      &:focus {
        outline: ${colors("orange010")} solid 4px;
      }
    `}

  ${({ isError }) =>
    isError &&
    css`
      background-color: #f05b41;

      &:hover {
        background-color: #f0321b;
      }

      &:focus {
        outline: #f0cbca solid 4px;
      }
    `}

    ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
      background-color: #b7e1f7;

      &:hover {
        background-color: #b7e1f7;
      }
    `}
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  position: relative;
  top: -2%;
  width: 17px;
  height: 17px;
  border-radius: 100%;
  margin-right: 7px;
  background-color: rgba(146, 255, 228, 0);

  border-top: 2px solid rgb(255, 255, 255);
  border-right: 2px solid rgba(212, 212, 212, 0.2);
  border-left: 2px solid rgba(212, 212, 212, 0.2);
  border-bottom: 2px solid rgba(212, 212, 212, 0.2);
  animation: ${spin} 1s infinite linear;
`;
