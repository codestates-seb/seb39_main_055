import { ReactNode } from "react";
import styled, { css } from "styled-components";

import { Skelcontainer, SkeletonDefaultProps, SkelItemDefault } from "./styles";

export const Rectangle = styled(SkelItemDefault)`
  border-radius: 5px;

  ${({ width, height }) =>
    width &&
    height &&
    css`
      width: ${width};
      height: ${height};
    `}
`;

type CircleProps = Partial<SkeletonDefaultProps> & {
  radius: string;
};

export const Circle = styled(SkelItemDefault)<CircleProps>`
  border-radius: 100%;

  ${({ radius }) =>
    radius &&
    css`
      width: ${radius};
      height: ${radius};
    `}
`;

export interface SkeletonProps {
  width: string;
  height: string;
  children: ReactNode;
  animation?: "blink" | "wave";
}

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
