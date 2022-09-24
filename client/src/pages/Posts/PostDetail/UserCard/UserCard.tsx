import { useCallback, useEffect, useRef, useState } from "react";
import { TbDots } from "react-icons/tb";
import styled from "styled-components";

import { useModal } from "../../../../components";
import { useCloseElement } from "../../../../hooks";

export const SUtils = styled.section`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 45px 0 50px 0;

  svg {
    font-size: 50px;
    color: #a5a5a5;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      color: #161616;
    }
  }
`;

export const SUserInfo = styled.section`
  display: flex;
  align-items: center;
  gap: 15px;
  font-family: "Noto Sans KR", sans-serif;

  & > img {
    width: 68px;
    height: 68px;
    border-radius: 50%;
    object-fit: cover;
  }

  & > span:nth-child(2) {
    font-size: 20px;
    color: #161616;
    font-weight: 600;
  }

  & > span:nth-child(3) {
    font-size: 18px;
    color: #a5a5a5;
  }
`;

export const SModal = styled.div<{ isOpen: boolean }>`
  position: absolute;
  right: 0;
  top: 50px;

  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  align-items: center;

  width: 112px;
  height: 87px;
  border: 1px solid #dbdbdb;
  border-radius: 10px;
  background-color: #ffffff;
  color: #434343;
  cursor: pointer;
  font-family: "Noto Sans KR", sans-serif;

  animation-name: dropdown;
  animation-duration: 500ms;
  animation-direction: normal;

  & > div {
    flex-basis: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    transition: all 0.1s ease-in-out;

    &:hover {
      font-weight: bold;
      font-size: 18px;
    }
  }

  & > div:first-child {
    border-bottom: 1px solid #dbdbdb;
  }

  @keyframes dropdown {
    from {
      opacity: 0;
      transform: translateY(5px);
    }
    to {
      opacity: 1;
    }
  }
`;

interface Prop {
  threadId: string;
  updatedAt: string;
  user: {
    ninkname: string;
    email: string;
    image: string;
    userStatus: string;
    longitude: string;
    latitude: string;
    userRole: string;
  };
}

export const SContainer = styled.div`
  border: none;
  border-radius: 10px;

  & > main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    padding: 80px;
    background-color: #f5f5f5;

    & > header {
      color: #161616;
      font-size: 25px;
      font-family: "ONE-Mobile-Bold";
    }

    & > p {
      font-size: 20px;
    }
  }
`;

export const SButtonContainer = styled.section`
  display: flex;
  gap: 7px;
  background-color: #f5f5f5;
  border: none;
  border-radius: 0 0 10px 10px;

  & > button {
    flex-basis: 50%;
    height: 100px;
    border: none;
    background-color: #ffffff;
    font-size: 30px;
    font-family: "ONE-Mobile-Regular";
    transition: all 0.3s;

    margin-bottom: -1px;
  }
`;

export const SDeleteButton = styled.button`
  color: #f53a3a;
  /* border-radius: 0 0 10px 0px; */

  &:hover {
    color: #ffffff;
    border-color: #f53a3a;
    background-color: #f53a3a;
  }
`;

export const SCancelButton = styled.button`
  color: #097aff;

  &:hover {
    color: #ffffff;
    border-color: #097aff;
    background-color: #097aff;
  }
`;

const DeleteModal = () => {
  return (
    <SContainer>
      <main>
        <header>댕댕이 숲의 기록을 삭제 하시겠습니까?</header>
        <p>삭제한 게시물은 다시 복원할 수 없습니다.</p>
      </main>
      <SButtonContainer>
        <SCancelButton type="button">취소</SCancelButton>
        <SDeleteButton type="button">삭제</SDeleteButton>
      </SButtonContainer>
    </SContainer>
  );
};

const UserCard = ({ threadId, user, updatedAt }: Prop) => {
  const [isTabOpen, setIsTabOpen, tabRef] = useCloseElement();
  const { openModal, closeModal } = useModal();

  return (
    <SUtils>
      <SUserInfo>
        <img src={user.image} alt="profile" />
        <span>{user.ninkname}</span>
        <span>{updatedAt}</span>
      </SUserInfo>
      {/** 클릭시 모달창 */}
      <TbDots onClick={() => setIsTabOpen((prev) => !prev)} />
      <SModal isOpen={isTabOpen} ref={tabRef}>
        <div>수정</div>
        <div onClick={() => openModal(<DeleteModal />)}>삭제</div>
      </SModal>
    </SUtils>
  );
};

export default UserCard;
