import styled, { css } from "styled-components";

import { colors } from "../../assets";
import NoResult from "../NoResult/NoResult";

export const SSection = styled.section`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  width: calc(100% - 40px);
  margin: 20px;
`;

export const SButtonBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  column-gap: 10px;
  margin-left: auto;
  margin-bottom: 80px;
`;

const defaultButton = css`
  padding: 10px 20px;
  color: #161616;
  background-color: inherit;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  transition: all 0.4s;
  box-shadow: 1px 3px 10px hsla(0, 0%, 0%, 0.05),
    1px 2px 4px hsla(0, 0%, 0%, 0.05), 0 4px 8px hsla(0, 0%, 0%, 0.1);

  &:hover {
    background-color: #ffc107;
    border-color: #ffc107;
  }
`;

export const SButton = styled.button`
  ${defaultButton}
`;

export const SFilterUList = styled.ul<{ isOpen: boolean }>`
  position: absolute;
  right: 0px;
  top: 43px;
  width: 100px;
  background-color: white;
  border: 1px solid ${colors("black250")};
  border-radius: 10px;
  font-size: 16px;
  color: ${colors("black250")};
  transition: 400ms all;
  overflow: hidden;
  z-index: 1;

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
  height: 33px;
  padding: 5px;
  border-bottom: 1px solid ${colors("black250")};
  transition: 400ms all;
  cursor: pointer;

  &:last-child {
    border-bottom: 0px;
  }

  &:hover {
    background-color: ${colors("black050")};
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
