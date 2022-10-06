import { IoLocationOutline } from "react-icons/io5";
import styled, { css } from "styled-components";

import { SearchBar as Search } from "../../Main";

export const SHeader = styled.header`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  row-gap: 20px;
  margin-bottom: 40px;
  padding-top: 300px;

  @media screen and (max-width: 1650px) {
    padding-top: 0;
  }
`;

export const SearchBar = styled(Search)`
  margin-top: 65px;
  max-width: 800px;
`;

export const SWarningBox = styled.div<{ showWarning: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  row-gap: 8px;
  height: 0px;
  overflow: hidden;
  transition: 400ms all;

  ${({ showWarning }) =>
    showWarning &&
    css`
      height: 50px;
    `}
`;

export const SaBox = styled.div`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

export const SaP = styled.p`
  display: flex;
  align-items: center;
  color: #f86b6b;
  font-weight: bold;
`;

export const SbP = styled.p`
  display: inline-block;
  font-weight: normal;
  margin-left: 5px;
  color: #7a7a7a;
`;

export const SLocSVG = styled(IoLocationOutline)`
  position: relative;
  transform: translateY(-7%);
  width: 20px;
  height: 20px;
  margin-right: 5px;
  color: #ff9980;
`;
