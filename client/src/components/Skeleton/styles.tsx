import styled, { css } from "styled-components";

import { blink, wave } from "./animation";
import { SkeletonProps } from "./Skeleton";

export type SkeletonDefaultProps = Omit<SkeletonProps, "children">;

export const Skelcontainer = styled.div<SkeletonDefaultProps>`
  display: flex;
  position: relative;
  flex-flow: column nowrap;
  row-gap: 5px;
  justify-content: center;

  ${({ width, height }) =>
    width &&
    height &&
    css`
      width: ${width};
      height: ${height};
    `}/*   ${({ animation }) =>
    animation === "wave" &&
    css`
      &::before {
        content: "";
        display: block;
        overflow: hidden;
        position: absolute;
        left: -20%;
        width: 20px;
        height: 100%;
        filter: blur(35px);
        transform: skewX(-20deg);
        background-color: #a7a7a7;
        z-index: 2;
        animation: ${wave} 1s linear infinite;
      }
    `} */
`;

export const SkelItemDefault = styled.div<SkeletonDefaultProps>`
  position: relative;
  overflow: hidden;
  background-color: #f5f5f5;

  ${({ animation }) =>
    animation === "blink"
      ? css`
          animation: ${blink} 0.5s ease infinite;
        `
      : css`
          &::before {
            content: "";
            display: block;
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: #f0f0f0;
          }
        `}
`;
