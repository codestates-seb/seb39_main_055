import { AiFillStar } from "react-icons/ai";
import styled from "styled-components";

export const SArticle = styled.article`
  display: grid;
  grid-template-columns: 140px 1fr;
  grid-template-rows: 60px 115px 35px;
  grid-template-areas:
    "img place"
    "img review"
    "img stars";
  column-gap: 15px;
  padding-right: 15px;
  row-gap: 10px;
  width: 100%;
  height: 230px;
  color: ${({ theme }) => theme.colors.black250};
  font-size: 14px;
  line-height: 1.3rem;
  box-shadow: 0px 0px 5px grey;
  overflow-y: hidden;
`;

export const SReviewImg = styled.img`
  width: 140px;
  height: 100%;
  grid-area: img;
`;

export const SPlaceHeader = styled.header`
  grid-area: place;
`;

export const SP = styled.p`
  margin-top: 13px;
`;

export const SH3 = styled.h3`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.black300};
`;

export const SReviewP = styled.p`
  grid-area: review;
`;

export const SFooter = styled.footer`
  grid-area: stars;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding-bottom: 15px;
`;

export const SStarSVG = styled(AiFillStar)`
  width: 20px;
  height: 20px;
`;

export const SRating = styled.span`
  margin-left: 3px;
`;

export const SReviewerP = styled.p`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

export const SName = styled.span`
  margin-right: 10px;
`;

export const SImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  margin-right: 10px;
`;
