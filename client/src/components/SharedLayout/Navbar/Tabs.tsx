import { useNavigate } from "react-router-dom";

import { logOutUser, useAppDispatch } from "../../../redux";

export const DefaultTab = () => {
  const navigate = useNavigate();

  return (
    <>
      <div onClick={() => navigate("/login")}>로그인</div>
      <div onClick={() => navigate("/signup")}>회원가입</div>
    </>
  );
};

export const UserTab = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <>
      <div onClick={() => navigate("/mypage")}>마이페이지</div>
      <div onClick={() => navigate("/place/new")}>매장 등록</div>
      <div onClick={() => dispatch(logOutUser())}>로그아웃</div>
    </>
  );
};
