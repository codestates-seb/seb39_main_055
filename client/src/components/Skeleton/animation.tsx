import { keyframes } from "styled-components";

export const blink = keyframes`
  0% {
      opacity: 0.5;
    }
  50% {
      opacity: 1;
  }
  100% {
      opacity: 0.5;
  }
`;

export const wave = keyframes`
  0% {
      left: 0%;
    }
  50% {
      left: 50%;
  }
  100% {
      left: 100%;
  }
`;
