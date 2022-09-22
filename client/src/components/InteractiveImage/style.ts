import styled from "styled-components";

import { InteractiveProps } from "./InteractiveImage";

type LabelProps = Pick<InteractiveProps, "hoverColor">;

export const SbLabel = styled.label<LabelProps>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 1;
  color: rgba(0, 0, 0, 0);
  font-size: 14px;
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0);
  transition: 600ms all;

  &:hover {
    color: white;
    background-color: ${({ hoverColor }) => hoverColor};
  }
`;

export const SbButton = styled.button`
  width: 100%;
  height: 100%;
  background-color: white;
  border: 0;
  padding: 0;
`;

export const SImg = styled.img`
  object-fit: cover;
  max-height: 100%;
  clip-path: inset(1px round 5px);
`;
