import styled from "styled-components";

export const SList = styled.li`
  border-bottom: 1px solid #bdbdbd;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 150px;
  padding-bottom: 40px;
`;

export const SUtils = styled.section`
  flex-basis: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SUserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  & > img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
  }

  & > span {
    font-size: 16px;
    color: #161616;
  }
`;

export const SBody = styled.p`
  flex-grow: 1;
  line-height: 35px;
`;

export const SBottom = styled.section<{ isLike: boolean }>`
  flex-basis: 15px;
  display: flex;
  align-items: center;
  gap: 17px;
  color: #a5a5a5;
  font-size: 14px;

  & > div {
    display: flex;
    align-items: center;
    cursor: pointer;

    & > svg {
      margin-right: 2px;
      font-size: 15px;
      color: ${({ isLike }) => isLike && "red"};
      fill: ${({ isLike }) => isLike && "red"};
    }

    & > span {
      padding-top: 2px;
    }
  }
`;
