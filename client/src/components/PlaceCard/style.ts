import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { colors } from "../../assets";

const LIST_BREAK_POINT = "580px";

export const SList = styled.li`
  display: flex;
  flex-flow: column nowrap;
  row-gap: 15px;
  height: 340px;
  width: 100%;
  min-width: 200px;
`;

export const SaLink = styled(Link)`
  flex: 1 1 240px;
  width: 100%;
  overflow: hidden;
`;

export const SImg = styled.img`
  max-height: 100%;
  object-fit: contain;

  @media screen and (max-width: ${LIST_BREAK_POINT}) {
    max-height: max-content;
    max-width: 100%;
  }
`;

export const SHeader = styled.header`
  flex: 1 0 60px;
  display: flex;
  flex-flow: column nowrap;
  row-gap: 10px;
`;

export const STopBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  column-gap: 15px;
`;

export const SH2 = styled.h2`
  display: flex;
  align-items: center;
  color: ${colors("orange500")};
  font-size: 15px;
  font-weight: bold;
  height: 16px;
`;

export const SP = styled.p`
  display: flex;
  align-items: center;
  color: ${colors("black250")};
  font-size: 12px;
`;

export const SH1 = styled.h1`
  font-size: 22px;
`;

export const SBar = styled.span`
  display: block;
  height: 3px;
  width: 25px;
  background-color: ${colors("black500")};
`;

export const SFooter = styled.footer`
  display: flex;
  flex-flow: row nowrap;
  margin-top: 5px;
`;

export const SStarSVG = styled(AiFillStar)`
  width: 16px;
  fill: ${colors("orange500")};
`;

export const SRatingP = styled.p`
  display: flex;
  align-items: center;
  padding-top: 2px;
  margin-left: 3px;
  font-size: 14px;
  color: ${colors("black250")};
`;
