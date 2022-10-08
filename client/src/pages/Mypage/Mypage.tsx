import { useEffect } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import user from "../../assets/images/mypage/user.png";
import { useModal } from "../../components";
import ResignModal from "../../components/Modal/ResignModal/ResignModal";
import { useAppSelector } from "../../redux";
import HeartList from "./HeartList/HeartList";
import MyPostList from "./MyPostList/MyPostList";
import RecentList from "./RecentList/RecentList";
import {
  SBorderLine,
  SContainer,
  SEditUserInfo,
  SLinkContainer,
  SMyContents,
  SMyInfo,
  SMyInfoContainer,
  SRegistCompany,
  SResignation,
  SUserContainer,
  SUserImg,
} from "./style";

const Mypage = () => {
  const navigate = useNavigate();
  const { loginStatus, userInfos } = useAppSelector((state) => state.user);
  const { openModal } = useModal();

  useEffect(() => {
    if (!loginStatus) {
      navigate("/");
    }
  }, [loginStatus, navigate]);

  const localstorageData = JSON.parse(
    localStorage.getItem("recentPlace") as string
  );

  return (
    <SContainer>
      <h1>마이페이지</h1>
      <SUserContainer>
        <SMyInfoContainer>
          <SMyInfo>
            <SUserImg>
              {(userInfos?.image.length as number) > 0 ? (
                <img alt="유저사진" src={userInfos?.image} />
              ) : (
                <img alt="기본사진" src={user} />
              )}
              {(userInfos?.nickname.length as number) > 0 ? (
                <div>{userInfos?.nickname} 님</div>
              ) : (
                <div>로그인해주세요</div>
              )}
            </SUserImg>
            <SLinkContainer>
              {userInfos?.userRole === "ROLE_OWNER" ? (
                <SRegistCompany onClick={() => navigate("/place/new")}>
                  매장등록
                  <MdArrowForwardIos />
                </SRegistCompany>
              ) : (
                <SRegistCompany onClick={() => navigate("/business")}>
                  사업자등록
                  <MdArrowForwardIos />
                </SRegistCompany>
              )}
              <SEditUserInfo onClick={() => navigate("/mypage/edit")}>
                회원정보수정
                <MdArrowForwardIos />
              </SEditUserInfo>
              <SResignation onClick={() => openModal(<ResignModal />)}>
                회원탈퇴
                <MdArrowForwardIos />
              </SResignation>
            </SLinkContainer>
          </SMyInfo>
        </SMyInfoContainer>
        <SBorderLine>
          <span />
        </SBorderLine>
        <SMyContents>
          <HeartList />
          <RecentList />
          <MyPostList />
        </SMyContents>
      </SUserContainer>
    </SContainer>
  );
};

export default Mypage;
