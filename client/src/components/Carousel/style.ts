import styled, { css } from "styled-components";

export const SCarouselBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  flex-flow: row nowrap;
  z-index: 1;
  overflow: hidden;
`;

const arrowDefault = css`
  content: "";
  display: block;
  position: absolute;
  width: 20px;
  height: 3px;
  background-color: white;
  border-radius: 0px 10px 10px 10px;
  box-shadow: -5px -5px 20px white;
  top: 50%;
`;

export const SNext = styled.span`
  position: absolute;
  right: 15px;
  top: 37%;
  width: 25px;
  height: 25px;
  transform: translateY(-50%);
  z-index: 3;
  cursor: pointer;

  &::before {
    ${arrowDefault}
    left: 20px;
    transform-origin: 0 100%;
    transform: translateY(-100%) rotate(-135deg);
  }

  &::after {
    ${arrowDefault}
    transform-origin: 100% 100%;
    transform: translateY(-100%) rotate(-45deg);
  }
`;

export const SPrev = styled(SNext)`
  left: 15px;
  transform: rotate(180deg) translateY(50%);
`;

export const SItemBox = styled.div`
  flex: 0 0 100vw;
  position: absolute;
  width: 100%;
  right: -100%;
  z-index: -1;
  overflow: hidden;
  transition: 0.8s all;

  &.main {
    right: 0%;
    z-index: 1;
  }

  &.left {
    right: 100%;
    z-index: -1;
  }

  &.right {
    right: -100%;
    z-index: -1;
  }
`;
