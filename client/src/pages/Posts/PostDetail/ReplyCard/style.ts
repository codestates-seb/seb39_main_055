import styled from "styled-components";

export const SList = styled.li`
  border-bottom: 1px solid #bdbdbd;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 150px;
  padding-bottom: 30px;
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

  & > span:last-child {
    color: #a5a5a5;
    font-size: 14px;
  }
`;

export const SBody = styled.div`
  flex-grow: 1;
  line-height: 35px;
`;
