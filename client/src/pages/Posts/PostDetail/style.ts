import styled from "styled-components";

export const SContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1130px) {
    padding: 0 20px;
  }
`;

export const SMainContainer = styled.main`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  border-bottom: 3px solid #dbdbdb;

  & > h1 {
    color: #707070;
    font-size: 40px;
  }
`;

export const SImageContainer = styled.section`
  width: 100%;
  height: 650px;
  border-radius: 17px;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 17px;
  }

  @media screen and (max-width: 750px) {
    height: 300px;
  }
`;

export const SBody = styled.div`
  margin: 45px 0;
  color: #161616;
  font-size: 18px;
  line-height: 35px;

  @media screen and (max-width: 750px) {
    margin: 50px 0;
  }
`;

export const SLikeContainer = styled.section<{ isLike: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 50px;

  & > svg {
    cursor: pointer;
    font-size: 30px;
    color: ${({ isLike }) => isLike && "#ffc107"};
    fill: ${({ isLike }) => isLike && "#ffc107"};
    transition: all 0.3s;
  }

  & > span {
    color: #161616;
    font-size: 20px;
    font-weight: 600;
    font-family: "Noto Sans KR", sans-serif;
  }
`;

export const SCommentHeader = styled.header`
  margin-top: 55px;
  margin-bottom: 20px;
  font-size: 18px;

  & > span:first-child {
    color: #161616;
    margin-right: 10px;
  }

  & > span:last-child {
    color: #ffc107;
  }
`;

export const SListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: 50px;
  margin-bottom: 50px;
`;

export const SLoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 380px);
`;

export const SButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`;
