import styled, { css } from "styled-components";

import { mobile } from "../../../assets";

export const SContainer = styled.div`
  font-family: "ONE-Mobile-Regular";
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-content: center;

  overflow-y: hidden;
  cursor: pointer;

  ${mobile(css`
    flex-direction: column;
    align-items: center;
    height: 610px;
    overflow-x: hidden;
  `)}

  @media screen and (max-width: 1110px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: auto;
    flex-wrap: wrap;
  }
`;

export const STextContainer = styled.div`
  width: 40%;
  display: flex;

  @media screen and (max-width: 1110px) {
    flex-direction: row;
    justify-content: center;
    padding-right: 10%;
    align-items: center;
    height: auto;
    width: 100%;
    flex-wrap: wrap;
  }
  ${mobile(css`
    flex-wrap: wrap;
    width: auto;
    height: 10%;
    padding: 0px;
  `)}
`;

export const SContents = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: auto;
  width: 50%;
  gap: 15px;

  ${mobile(css`
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `)}

  @media screen and (max-width: 1110px) {
    flex-direction: column;
  }
`;

export const SSideContents = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  height: auto;
  width: 20%;

  @media screen and (max-width: 1110px) {
    height: auto;
    flex-direction: row;
    margin-left: 30px;
  }

  ${mobile(css`
    flex-direction: row;
    height: 100px;
    margin: 0px;
  `)}
  & > img {
    :hover {
      opacity: 0.7;
      transition: 0.3s ease-out;
    }

    :not(:hover) {
      transition: 0.3s ease-out;
    }
    ${mobile(css`
      widht: 100%;
      height: 100px;
    `)}
  }
`;

export const SUserPickContents = styled.span`
  width: 565px;
  height: 565px;
  position: relative;
  align-items: center;

  & > img {
    widht: 565px;
    height: 565px;
    object-fit: contain;

    :hover {
      opacity: 0.7;
      transition: 0.3s ease-out;
    }
  
    :not(:hover) {
      transition: 0.3s ease-out;
    }
    
    ${mobile(css`
      width: 100%;
      height: 350px;
    `)}
    `;

export const SContentsInfo = styled.div`
  font-size: 30px;
  line-height: 42px;
  position: absolute;
  top: 78%;
  left: 8%;

  ${mobile(css`
    top: 46%;
    left: 24%;
    font-size: 20px;
    line-height: 30px;
  `)}
`;

export const SecondTextLine = styled.a`
  color: #ffff;
  display: flex;
  align-items: center;
`;
