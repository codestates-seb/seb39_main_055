import styled from "styled-components";

export const SCard = styled.li`
  display: flex;
  gap: 60px;
  height: 260px;
  padding: 24px;
  box-shadow: 1px 3px 10px hsla(0, 0%, 0%, 0.05),
    1px 2px 4px hsla(0, 0%, 0%, 0.05), 0 4px 8px hsla(0, 0%, 0%, 0.1);
  transition: all 0.4s;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
    background-color: #f5f4f4;
  }

  @media screen and (max-width: 800px) {
    flex-direction: column;
    gap: 20px;
    height: 600px;
  }
`;

export const SImgContainer = styled.section`
  border-radius: 17px;
  flex-basis: 260px;

  & > img {
    width: 260px;
    height: 100%;
    border-radius: 17px;
    object-fit: cover;
  }

  @media screen and (max-width: 800px) {
    width: 100%;
    height: 60%;

    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

export const SMainContainer = styled.section`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  padding: 10px;
`;

export const SInfo = styled.div`
  flex-basis: 20%;
  display: flex;
  align-items: center;
  gap: 13px;
  font-family: "Noto Sans KR", sans-serif !important;

  & > img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }

  & > span:nth-child(2) {
    color: #161616;
    font-size: 18px;
    font-weight: 500;
  }

  & > span:nth-child(3) {
    color: #a5a5a5;
    font-size: 16px;
  }
`;

export const SBody = styled.div`
  color: #161616;
  font-size: 16px;
  line-height: 30px;

  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const SLike = styled.div`
  flex-basis: 20%;
  display: flex;
  align-items: center;
  gap: 12px;

  & > span {
    color: #b1b1b1;
    font-size: 14px;

    & > strong {
      color: #ffc107;
    }
  }
`;
