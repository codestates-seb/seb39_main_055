import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { logOutUser, useAppDispatch } from "../../../redux";

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

  return (
    <SUserContainer>
      <div onClick={() => navigate("/place/list")}>펫플레이스</div>
      <div onClick={() => navigate("/post/list")}>댕댕이숲</div>
      <div onClick={() => navigate("/mypage")}>마이페이지</div>
      <div onClick={() => navigate("/place/new")}>매장 등록</div>
      <div onClick={() => dispatch(logOutUser())}>로그아웃</div>
    </SUserContainer>
  );
};
