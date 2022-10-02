import styled from "styled-components";

export const SHeader = styled.header`
  padding: 35px 0;
  border-bottom: 1px solid #dbdbdb;

  & > p {
    color: #434343;
    font-size: 26px;
    margin-bottom: 20px;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.tablet}) {
    & > p {
      font-size: 22px;
    }
  }
`;

export const SCategory = styled.p`
  color: #ffc107 !important;
`;

export const STitle = styled.div<{ isLike: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  & > h1 {
    color: #161616;
    font-size: 36px;

    &:after {
      content: "";
      display: block;
      width: 32px;
      border-bottom: 3px solid #161616;
      margin-top: 8px;
    }
  }

  & > svg {
    color: ${({ isLike }) => isLike && "#ff3737"};
    fill: ${({ isLike }) => isLike && "#ff3737"};
    font-size: 32px;
    cursor: pointer;
    transition: all 0.2s;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.tablet}) {
    & > h1 {
      font-size: 28px;
    }
  }
`;

export const SScoreContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  & > svg {
    margin-right: 6px;
    font-size: 26px;
    color: #ffc107;
    fill: #ffc107;
  }

  & > span {
    margin-right: 20px;
    color: #707070;
    font-size: 18px;
  }

  & > div {
    display: flex;
    align-items: center;
    color: #ffa000;
    fill: #ffa000;
    font-size: 18px;
    cursor: pointer;

    & > svg {
      font-size: 24px;
    }
  }
`;

export const SLocationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  color: #707070;
  font-size: 18px;

  & > div:first-child {
    display: flex;
    align-items: center;
    gap: 10px;

    & > svg {
      fill: #707070;
      font-size: 30px;
    }

    & > span {
      vertical-align: middle;
    }
  }

  & > div:last-child {
    display: flex;
    align-items: center;
    gap: 10px;

    & > button {
      width: 60px;
      height: 28px;
      color: #161616;
      background-color: inherit;
      border: 1px solid #161616;
      border-radius: 20px;
      font-size: 16px;
      transition: all 0.4s;

      &:hover {
        background-color: #ffc107;
        border-color: #ffc107;
      }
    }
  }
`;
