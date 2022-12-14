import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

import { mobile, tablet } from "../../assets";

export const SCategoryMenu = styled.menu`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  gap: 20px 20px;
  /* margin: 15px 10px; */

  ${mobile(css`
    gap: 15px 10px;
  `)}
`;

export const SIconList = styled.li`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  row-gap: 18px;
  width: 130px;
  height: 100%;
  transition: 0.5s color;
  color: #a4a4a4;

  &:hover {
    color: #ffc107;
  }

  ${tablet(css`
    width: 100px;
  `)}

  ${mobile(css`
    width: 80px;
    row-gap: 7px;
  `)}
`;

export const SImgLink = styled(Link)<{ selected?: boolean }>`
  width: 105px;
  height: 105px;
  border-radius: 100%;
  border: 2px solid #a4a4a4;
  transition: 0.5s border;

  ${({ selected }) =>
    selected &&
    css`
      border: 2px solid #ffc107;
    `}

  &:hover {
    border: 2px solid #ffc107;
  }

  ${tablet(css`
    width: 95px;
    height: 95px;
  `)}

  ${mobile(css`
    width: 80px;
    height: 80px;
  `)}
`;

export const SIconImg = styled.img`
  width: 100%;
  height: 100%;
  padding: 20px;

  ${mobile(css`
    padding: 15px;
  `)}
`;

export const SIconText = styled.span<{ selected?: boolean }>`
  font-size: 18px;

  ${({ selected }) =>
    selected &&
    css`
      color: #ffc107;
      font-weight: bold;
    `}

  ${mobile(css`
    font-size: 15px;
  `)}
`;
