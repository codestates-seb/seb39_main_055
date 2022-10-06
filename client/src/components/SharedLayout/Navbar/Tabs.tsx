import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { logOutUser, useAppDispatch, useAppSelector } from "../../../redux";
import { ErrorModal, useModal } from "../../Modal";

export const SUserContainer = styled.section`
  color: #434343;
  font-size: 18px;

  & > div {
    padding: 10px 20px 10px 20px;
  }

  & > div:hover {
    background-color: ${({ theme }) => theme.colors.black010};
    cursor: pointer;
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

  @media screen and (min-width: ${({ theme }) => theme.breakPoints.tablet}) {
    & > div:first-child {
      display: none;
    }
    & > div:nth-child(2) {
      display: none;
    }
  }
`;

export const DefaultTab = () => {
  const navigate = useNavigate();

  return (
    <SUserContainer>
      <div onClick={() => navigate("/place/list")}>펫플레이스</div>
      <div onClick={() => navigate("/post/list")}>댕댕이숲</div>
      <div onClick={() => navigate("/login")}>로그인</div>
      <div onClick={() => navigate("/signup")}>회원가입</div>
    </SUserContainer>
  );
};

export const UserTab = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userInfos } = useAppSelector((state) => state.user);
  const { openModal } = useModal();
  const handleLogout = () => {
    openModal(
      <ErrorModal
        body="로그아웃 하시겠습니까?"
        callback={() => {
          dispatch(logOutUser());
          navigate("/");
        }}
      />
    );
  };

  return (
    <SUserContainer>
      <div onClick={() => navigate("/place/list")}>펫플레이스</div>
      <div onClick={() => navigate("/post/list")}>댕댕이숲</div>
      <div onClick={() => navigate("/mypage")}>마이페이지</div>
      <div onClick={handleLogout}>로그아웃</div>
    </SUserContainer>
  );
};
