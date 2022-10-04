import { ReactNode } from "react";
import styled, { css } from "styled-components";

import { blink } from "./animation";
import { Skelcontainer, SkeletonDefaultProps, SkelItemDefault } from "./styles";

type CircleProps = Partial<SkeletonDefaultProps> & {
  radius: string;
};

export interface SkeletonProps {
  width: string;
  height: string;
  children: ReactNode;
  animation?: "blink" | "wave";
}

export const Rectangle = styled.div<SkeletonDefaultProps>`
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  background-color: #f0f0f0;
  animation: ${blink} 1.5s ease infinite;

  ${({ width, height }) =>
    width &&
    height &&
    css`
      width: ${width};
      height: ${height};
    `}
`;

export const Circle = styled(SkelItemDefault)<CircleProps>`
  border-radius: 100%;

  ${({ radius }) =>
    radius &&
    css`
      width: ${radius};
      height: ${radius};
    `}
`;

export const Skeleton = ({
  width,
  height,
  children,
  animation = "blink",
}: SkeletonProps) => {
  return (
    <Skelcontainer width={width} height={height} animation={animation}>
      {children}
    </Skelcontainer>
  );
};
