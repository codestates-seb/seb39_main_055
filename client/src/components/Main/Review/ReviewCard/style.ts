import { AiFillStar } from "react-icons/ai";
import styled, { css } from "styled-components";

import { mobile } from "../../../../assets";

export const SArticle = styled.article`
  position: relative;
  display: grid;
  grid-template-columns: 140px 1fr;
  grid-template-rows: 2fr 4fr minmax(45px, 2fr);
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
  border-radius: 3px;
  overflow: hidden;

  ${mobile(css`
    padding: 10px;
    height: 219px;
    grid-template-rows: 2fr 4fr 1fr;
  `)}
`;

export const SReviewImg = styled.img`
  width: 140px;
  height: 100%;
  grid-area: img;

  ${mobile(css`
    position: absolute;
    width: 120%;
    height: auto;
    object-fit: cover;
    opacity: 0.08;
    grid-area: 1/1/4/3;
    z-index: -1;
    left: -10px;
    top: -60px;
  `)}
`;

export const SPlaceHeader = styled.header`
  grid-area: place;

  ${mobile(css`
    grid-area: 1/1/2/3;
  `)}
`;

export const SP = styled.p`
  margin-top: 13px;

  ${mobile(css`
    margin-top: 5px;
  `)}
`;

export const SH3 = styled.h3`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.black300};
`;

export const SReviewP = styled.p`
  grid-area: review;

  ${mobile(css`
    grid-area: 2/1/3/3;
  `)}
`;

export const SFooter = styled.footer`
  grid-area: stars;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  ${mobile(css`
    grid-area: 3/1/4/3;
    align-items: end;
  `)}
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
