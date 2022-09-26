import React, { useEffect } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

import { mobile, tablet } from "../../assets";
import user from "../../assets/images/mypage/user.png";
import HeartList from "./HeartList/HeartList";
import MyPostList from "./MyPostList/MyPostList";
import { recentPlace } from "./RecentList/RecentDummyData";
import RecentList from "./RecentList/RecentList";

const SContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  padding-top: 100px;
  align-items: center;
  gap: 24px;
  min-height: calc(100vh - 380px);
  font-family: "ONE-Mobile-Regular";

  & > h1 {
    font-size: 42px;
    font-weight: bold;
    ${mobile(css`
      font-size: 32px;
      padding-top: 24px;
      justify-content: flex-start;
    `)}
  }
`;

const SUserContainer = styled.div`
  width: 100%;
  height: auto;
  border: 1px solid ${({ theme }) => theme.colors.black050};
  display: flex;
  justify-content: center;

  ${mobile(css`
    flex-direction: column;
  `)}
`;

const SMyInfoContainer = styled.div`
  width: 25%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 82px;

  ${mobile(css`
    width: 100%;
    height: auto;
    flex-direction: row;
    align-items: center;
    padding-top: 5px;
  `)}

  & > div {
    width: 100%;
    font-size: 26px;
    font-weight: bold;
    gap: 30px;
    color: ${({ theme }) => theme.colors.black500};
    ${mobile(css`
      font-size: 20px;
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-top: 5px;
      flex-wrap: wrap;
    `)}
  }
`;

const SMyInfo = styled.div`
  width: 160px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  & > img {
    ${mobile(css`
      width: 50px;
      height: 50px;
    `)}
  }

  ${mobile(css`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  `)}
`;

const SLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 200;
  width: 140px;
  gap: 10px;

  & > svg {
    align-items: flex-end;
  }

  ${mobile(css`
    flex-direction: row;
    width: auto;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  `)}
`;

const SMyContents = styled.div`
  width: 70%;
  overflow: auto;
  height: auto;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  ${mobile(css`
    flex-direction: row;
    width: auto;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  `)}
`;

const SBorderLine = styled.span`
  margin: 5% 0%;
  align-items: center;
  border-left: 1px solid ${({ theme }) => theme.colors.black050};
  height: 1230px;

  // ${mobile(css`
    //   display: none;
    //
  `)}
`;

const WritePost = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px 0px 10px 0px;
  font-size: 20px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.black500};

  :hover {
    color: ${({ theme }) => theme.colors.black200};
  }

  ${mobile(css`
    font-size: 16px;
    flex-direction: row;
    width: auto;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  `)}
`;

const EditUserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px 0px 10px 0px;
  font-size: 20px;
  width: 100%;
  color: ${({ theme }) => theme.colors.black500};

  :hover {
    color: ${({ theme }) => theme.colors.black200};
  }

  ${mobile(css`
    font-size: 16px;
    flex-direction: row;
    width: auto;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  `)}
`;

const RegistCompany = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px 0px 10px 0px;
  font-size: 20px;
  width: 100%;
  color: ${({ theme }) => theme.colors.black500};

  :hover {
    color: ${({ theme }) => theme.colors.black200};
  }

  ${mobile(css`
    font-size: 16px;
    flex-direction: row;
    width: auto;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  `)}
`;

const Resignation = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px 0px 10px 0px;
  font-size: 20px;
  width: 100%;
  color: ${({ theme }) => theme.colors.black500};

  :hover {
    color: ${({ theme }) => theme.colors.black200};
  }

  ${mobile(css`
    font-size: 16px;
    flex-direction: row;
    width: auto;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  `)}
`;

const SAsk1 = styled.a`
  font-size: 20px;
  padding: 20px 15px 20px 20px;
`;

const SAsk2 = styled.a`
  font-size: 20px;
  padding: 20px 20px 20px 15px;
  border-left: 1px solid ${({ theme }) => theme.colors.black050};
`;

const Mypage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("recentPlace", JSON.stringify(recentPlace));
  }, []);

  const localstorageData = JSON.parse(
    localStorage.getItem("recentPlace") as string
  );
  // console.log(localstorageData);
  return (
    <SContainer>
      <h1>마이페이지</h1>
      <SUserContainer>
        <SMyInfoContainer>
          <SMyInfo>
            <img alt="예시" src={user} />
            <div>Jin 님</div>
            <SLinkContainer>
              <WritePost onClick={() => navigate("/post/new")}>
                글 작성하기
                <MdArrowForwardIos />
              </WritePost>
              <RegistCompany onClick={() => navigate("/signup")}>
                업주등록하기
                <MdArrowForwardIos />
              </RegistCompany>
              <EditUserInfo onClick={() => navigate("/post/list")}>
                회원정보수정
                <MdArrowForwardIos />
              </EditUserInfo>
              <Resignation onClick={() => navigate("/signup")}>
                회원탈퇴
                <MdArrowForwardIos />
              </Resignation>
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
