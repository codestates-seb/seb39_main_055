import styled, { css } from "styled-components";

import { colors } from "../../assets";
import NoResult from "../NoResult/NoResult";

export const SSection = styled.section`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  margin: 20px;
  padding: 0px 20px;
`;

export const SButton = styled.button`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  column-gap: 3px;
  background-color: white;
  color: ${colors("black250")};
  border: 1px solid ${colors("black250")};
  border-radius: 10px;
  width: 65px;
  height: 27px;
  font-size: 15px;
  font-weight: bold;
  margin: 10px 0px;
  margin-left: auto;
`;

export const SFilterUList = styled.ul<{ isOpen: boolean }>`
  position: absolute;
  right: 20px;
  top: 39px;
  width: 70px;
  background-color: white;
  border: 1px solid ${colors("black250")};
  border-radius: 5px;
  font-size: 15px;
  color: ${colors("black250")};
  transition: 400ms all;
  overflow: hidden;

  ${({ isOpen }) => css`
    opacity: ${isOpen ? 1 : 0};
  `}
`;

export const SList = styled.li`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 5px;
  border-bottom: 1px solid ${colors("black250")};
  transition: 400ms all;
  cursor: pointer;

  &:last-child {
    border-bottom: 0px;
  }

  &:hover {
    background-color: ${colors("black010")};
  }
`;

export const SUList = styled.ul`
  display: grid;
  width: 100%;
  height: max-content;
  min-height: 600px;
  justify-items: center;
  align-content: center;
  column-gap: 40px;
  row-gap: 60px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-template-rows: repeat(auto-fill, 340px);
`;

export const SBottomBox = styled.div`
  height: 10px;
  width: 100%;
`;

export const NoSearchResult = styled(NoResult)`
  background-color: white;

  & > h1 {
    font-size: 22px;
    color: ${colors("black250")};
  }
`;
