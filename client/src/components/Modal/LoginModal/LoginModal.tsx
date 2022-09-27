import { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import logo from "../../../assets/images/logo/logo.png";
import { ButtonOrange, ButtonWhite } from "../../Form";
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

const LoginModal = () => {
  const navigate = useNavigate();
  const { closeModal } = useModal();

  useEffect(() => {
    return () => closeModal();
  });

  return (
    <SContainer>
      <img src={logo} alt="logo" />
      <span>로그인이 필요한 서비스 입니다.</span>
      <span>로그인 후 더욱 다양한 서비스를 이용해보세요 :)</span>
      <ButtonOrange onClick={() => navigate("/login")}>로그인</ButtonOrange>
      <ButtonWhite onClick={() => navigate("/signup")}>회원가입</ButtonWhite>
      <IoMdClose onClick={closeModal} />
    </SContainer>
  );
};

export default LoginModal;
