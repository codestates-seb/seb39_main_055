import React from "react";
import styled, { css } from "styled-components";

import { mobile, tablet } from "../../../assets";
import mascot from "../../../assets/icons/mascot.png";

interface EmptyProps {
  title: string;
  body1: string;
  body2: string;
}

const SContainer = styled.div`
  width: 100%;
  height: 315px;
  background-color: white;
  font-family: "ONE-Mobile-Regular";
  font-weight: bold;

  border: 1px solid ${({ theme }) => theme.colors.black050};
  background-color: ${({ theme }) => theme.colors.black010};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3px;
  margin: 5px 0px 0px 10px;

  @media screen and (max-width: 900px) {
    object-fit: cover;
    border-right: 1px solid ${({ theme }) => theme.colors.black050};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 315px;
    width: 450px;
    flex-wrap: wrap;
  }

  ${mobile(css`
    object-fit: cover;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 315px;
    width: 100%;
    flex-wrap: wrap;
    margin: 5px 0px 0px 0px;
  `)}
`;

const SIcon = styled.img`
  margin-bottom: 15px;

  @media screen and (max-width: 900px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  ${mobile(css`
    justify-content: center;
    align-items: center;
  `)}
`;

const STitle = styled.div`
  font-size: 16px;
  margin-bottom: 6px;
  display-flex;

  @media screen and (max-width: 900px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  ${mobile(css`
    font-size: 16px;
    width: 80%;
    line-height: 25px;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
  `)}
`;

const SBody1 = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.black400};

  @media screen and (max-width: 900px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  ${mobile(css`
    display: none;
    width: 60%;
    justify-content: center;
    align-items: center;
    margin: 5px 0px 5px 0px;
  `)}
`;

const SBody2 = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.black400};

  @media screen and (max-width: 900px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  ${mobile(css`
    display: none;

    width: 60%;
    flex-direction: column;
    align-items: center;
  `)}
`;

const NoImage = ({ title, body1, body2 }: EmptyProps) => {
  return (
    <SContainer>
      <SIcon src={mascot} alt="마스코트이미지" />
      <STitle>{title}</STitle>
      <SBody1>{body1}</SBody1>
      <SBody2>{body2}</SBody2>
    </SContainer>
  );
};
export default NoImage;
