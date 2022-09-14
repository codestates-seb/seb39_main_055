import { Link } from "react-router-dom";
import styled from "styled-components";

export const SCategorySection = styled.section`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  column-gap: 20px;
  row-gap: 20px;
  padding: 15px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

export const SIconBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  row-gap: 18px;
  width: 130px;
  height: 100%;
  transition: 0.5s all;
  color: #a4a4a4;

  &:hover {
    color: #ffc107;
  }
`;

export const SImgLink = styled(Link)`
  width: 120px;
  height: 120px;
  border-radius: 100%;
  border: 2px solid #a4a4a4;
  transition: 0.5s all;

  &:hover {
    border: 2px solid #ffc107;
  }
`;

export const SIconImg = styled.img`
  width: 120px;
  height: 120px;
  padding: 25px;
`;

export const SIconText = styled.span`
  font-size: 20px;
`;
