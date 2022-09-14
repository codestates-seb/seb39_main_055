import styled, { css } from "styled-components";

import { mobile, tablet } from "../../../assets";

export const SReviewSection = styled.section`
  width: 100%;
  margin-bottom: 80px;
`;

export const SHgroup = styled.hgroup`
  display: flex;
  flex-flow: column wrap;
  row-gap: 10px;
  align-items: center;
  margin: 20px 0px 30px 0px;
`;

export const SH1 = styled.h1`
  font-size: 43px;
  font-weight: normal;
  margin-bottom: 10px;

  ${tablet(css`
    font-size: 30px;
  `)}
`;

export const SH2 = styled.h2`
  font-size: 30px;
  font-weight: lighter;
  line-height: 2rem;
  color: ${({ theme }) => theme.colors.black250};

  ${tablet(css`
    font-size: 25px;
  `)}
`;

export const SCardSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SCardBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(420px, 0.65fr));
  gap: 15px;
  justify-content: center;
  align-items: center;

  ${mobile(css`
    grid-template-columns: repeat(auto-fill, minmax(310px, 0.8fr));
    gap: 20px;
  `)}
`;
