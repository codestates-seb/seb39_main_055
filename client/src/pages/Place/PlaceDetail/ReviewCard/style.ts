import styled from "styled-components";

export const SReviewList = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 15px;
  min-height: 200px;
  padding: 20px;
  border: 1px solid #dbdbdb;
  border-radius: 10px;
`;

export const SUserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > section {
    display: flex;
    align-items: center;
  }

  & > section > img {
    width: 45px;
    height: 45px;
    margin-right: 15px;
    border-radius: 50%;
    object-fit: cover;
  }

  & > section > div {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
`;

export const SStars = styled.div`
  display: flex;
  align-items: center;

  & > svg {
    margin-right: 2px;
    color: #ffc109;
  }

  & > p {
    display: flex;
    margin-left: 5px;
    color: #707070;
    padding-top: 2px;
    font-size: 12px;
  }
`;

export const SBody = styled.div`
  color: #434343;
  font-size: 16px;
  line-height: 30px;
`;

export const SDate = styled.p`
  font-size: 14px;
  color: #707070;
`;
