import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

import { mobile, tablet } from "../../../assets";

export const SArticle = styled.article`
  width: 100vw;
  height: 100%;
`;

export const SLink = styled(Link)`
  width: 100%;
  height: 500px;
`;

export const SImg = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
`;

export const SSection = styled.section`
  display: flex;
  flex-flow: column nowrap;
  padding: 20px 0px;
  height: calc(100% - 500px);
  background-color: white;
  padding-left: 100px;
  font-size: 42px;

  ${tablet(
    css`
      padding-left: 30px;
      font-size: 35px;
    `
  )}

  ${mobile(
    css`
      padding-left: 12px;
      font-size: 23px;
    `
  )}
`;

export const SH1 = styled.h1`
  font-size: 1em;
  font-weight: bold;
`;

export const SH2 = styled.h2`
  font-size: 0.7em;
  font-weight: lighter;
  line-height: 4rem;

  ${tablet(
    css`
      line-height: 3rem;
    `
  )}

  ${mobile(
    css`
      line-height: 2.5rem;
    `
  )}
`;

export const SMoreInfoBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.45em;
  font-weight: lighter;
  color: #555555;
  margin-top: 15px;

  ${mobile(
    css`
      font-size: 0.65em;
      margin-top: 10px;
    `
  )}
`;

export const SP = styled.p`
  display: inline-block;
  width: max-content;
  margin-right: 10px;
`;

export const SArrow = styled.span`
  display: inline-block;
  background-color: #555555;
  width: 50px;
  height: 2px;
  border-radius: 10px;

  &::before {
    content: "";
    display: block;
    transform-origin: 0% 50%;
    transform: translateX(50px) rotate(-150deg);
    width: 15px;
    height: 2px;
    background-color: #555555;
    border-radius: 10px;
  }
`;
