import { useNavigate } from "react-router-dom";

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
  // const navigate = useNavigate();

  return (
    <>
      <div>마이페이지</div>
      <div>찜</div>
      <div>나의 후기</div>
      <div>매장 등록</div>
      <div>로그아웃</div>
    </>
  );
};
