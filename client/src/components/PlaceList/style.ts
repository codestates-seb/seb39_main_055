import styled from "styled-components";

import { colors } from "../../assets";
import NoResult from "../NoResult/NoResult";

export const SUList = styled.ul`
  display: grid;
  width: calc(100% - 40px);
  height: max-content;
  justify-items: center;
  align-content: center;
  column-gap: 40px;
  row-gap: 60px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  margin: 20px;
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
