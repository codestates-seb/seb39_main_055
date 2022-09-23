import styled, { css } from "styled-components";

import { colors } from "../../../assets";

export const SImageAside = styled.aside`
  display: flex;
  flex-flow: column nowrap;
  flex: 1 1 20%;
  padding: 85px 20px 20px 25px;
`;

export const SRepImageBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 200px;
  border: 3px solid ${colors("black010")};
  border-radius: 5px;
`;

export const SRepImg = styled.img`
  max-width: 100%;
  object-fit: contain;
`;

export const SaLabel = styled.label.attrs({
  htmlFor: "upload-image",
})`
  position: absolute;
  display: flex;
  flex-flow: column wrap;
  row-gap: 5px;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  color: rgba(0, 0, 0, 0);
  transition: 600ms all;

  &:hover {
    background-color: rgba(124, 124, 124, 0.7);
    color: white;
  }
`;

export const SFileInput = styled.input.attrs({
  type: "file",
  id: "upload-image",
  multiple: true,
})`
  width: 0;
  height: 0;
`;

export const SaButton = styled.button`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  column-gap: 5px;
  border: 0px;
  background-color: white;
  margin-top: 15px;
  margin-left: auto;
  color: ${colors("black300")};
  font-size: 15px;
`;

export const arrowDefault = css`
  content: "";
  position: absolute;
  display: block;
  width: 10px;
  height: 2px;
  background-color: ${colors("black250")};
  border-radius: 0px 10px 10px 10px;
  box-shadow: -5px -5px 20px white;
`;

export const SMore = styled.span`
  display: inline-block;
  position: relative;
  width: 12px;
  top: -9%;

  &::before {
    ${arrowDefault}
    transform-origin: 100% 100%;
    transform: rotate(40deg) scale(1.06);
  }

  &::after {
    ${arrowDefault}
    transform-origin: 95% 50%;
    transform: rotate(-40deg);
  }
`;

export const SThumbnailUList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(calc((100% - 30px) / 4), 0));
  gap: 10px;
  margin-top: 17px;
  height: 330px;
  overflow: hidden;
`;

export const SList = styled.li`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow: hidden;
  border-radius: 5px;
`;
