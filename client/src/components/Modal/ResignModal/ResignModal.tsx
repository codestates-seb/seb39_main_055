import { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { resignUser } from "../../../apis/user/resignup";
import logo from "../../../assets/images/logo/logo.png";
import { logOutUser, useAppDispatch, useAppSelector } from "../../../redux";
import { ButtonOrange, ButtonWhite } from "../../Form";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import useModal from "../useModal";

export const SContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 50px 20px;
  background-color: #f0f0f0;

  & > img {
    margin-bottom: 10px;
  }

  & > span:nth-child(2) {
    font-size: 24px;
  }

  & > span:nth-child(3) {
    color: #767676;
    margin-bottom: 20px;
  }

  & > button {
    width: 60%;
  }

  & > svg {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
  }
`;

const ResignModal = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();
  const { userInfos } = useAppSelector((state) => state.user);

  // const { data, isLoading } = useQuery(
  //   ["resign", userInfos?.userId],
  //   resignUser,
  //   { retry: false, cacheTime: 30000 }
  // );

  useEffect(() => {
    return () => closeModal();
  });
  return (
    <SContainer>
      <img src={logo} alt="logo" />
      <span>정말로 탈퇴하시겠습니까?</span>
      <span>마이페이지 내역이 사라져요!</span>
      <div
        onClick={() => {
          dispatch(logOutUser());
          navigate("/");
        }}
      >
        <ButtonOrange>확인</ButtonOrange>
      </div>
      <ButtonWhite onClick={() => navigate("/mypage")}>취소</ButtonWhite>
      <IoMdClose onClick={closeModal} />
    </SContainer>
  );
};

export default ResignModal;
