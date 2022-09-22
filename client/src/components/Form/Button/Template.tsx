import styled from "styled-components";

import { colors } from "../../../assets";
import { Button } from "..";

export const ButtonOrange = styled(Button)`
  width: 350px;
`;

export const ButtonWhite = styled(Button)`
  width: 350px;
  background-color: white;
  color: ${colors("black400")};
  border: 1px solid ${colors("black050")};

  &:hover {
    background-color: ${colors("black400")};
    color: white;
    border-color: ${colors("black010")};
  }

  &:focus {
    outline: ${colors("black010")} solid 4px;
  }
`;
