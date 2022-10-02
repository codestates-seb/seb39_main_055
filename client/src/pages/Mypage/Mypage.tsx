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

  ${mobile(css`
    padding-top: 40px;
    justify-content: flex-start;
    gap: 10px;
  `)}
  &
    > h1 {
    font-size: 42px;
    font-weight: bold;
    ${mobile(css`
      font-weight: 400;
      font-size: 38px;
      padding-top: 0px;
      // justify-content: flex-start;
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
    border: none;
    justify-content: center;
    align-items: center;
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
    padding: 0px;
  `)}

  & > div {
    width: 100%;
    font-size: 26px;
    font-weight: bold;
    gap: 30px;
    color: ${({ theme }) => theme.colors.black500};

    ${mobile(css`
      flex-direction: row;
      font-size: 20px;
      width: 100%;
      height: 160px;
      border-bottom: 0.4px solid #d6d6d6;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-top: 5px;
      flex-wrap: wrap;
      gap: 10px;
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
  cursor: pointer;

  ${mobile(css`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  `)}
`;

const SUserImg = styled.div`
  gap: 40px;
  width: 160px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > img {
    ${mobile(css`
      width: 60px;
      margin-left: 25px;
    `)}
  }

  & > div {
    ${mobile(css`
      width: auto;
      margin-left: 25px;
    `)}
  }

  ${mobile(css`
    gap: 15px;
    width: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
    padding-top: 20px;
    flex-direction: column;
    width: auto;
    gap: 0px;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-left: 15px;
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

  ${mobile(css`
    display: none;
  `)}
`;

const SWritePost = styled.div`
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

const SEditUserInfo = styled.div`
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

const SRegistCompany = styled.div`
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

const SResignation = styled.div`
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
const Mypage = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   localStorage.setItem("recentPlace", JSON.stringify(recentPlace));
  // }, []);

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
            <SUserImg>
              <img alt="유저사진" src={user} />
              <div>JIN님</div>
            </SUserImg>
            <SLinkContainer>
              <SWritePost onClick={() => navigate("/post/new")}>
                글 작성하기
                <MdArrowForwardIos />
              </SWritePost>
              {/* 롤에따라 매장등록하기/업주등록하기로 바뀔것 */}
              <SRegistCompany onClick={() => navigate("/place/new")}>
                업주등록하기
                <MdArrowForwardIos />
              </SRegistCompany>
              <SEditUserInfo onClick={() => navigate("/mypage/edit")}>
                회원정보수정
                <MdArrowForwardIos />
              </SEditUserInfo>
              <SResignation onClick={() => navigate("/.")}>
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
