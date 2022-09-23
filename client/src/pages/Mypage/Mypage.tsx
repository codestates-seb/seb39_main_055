import React, { useEffect } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import styled from "styled-components";

import borderline from "../../assets/images/mypage/borderline.png";
import love from "../../assets/images/mypage/love.png";
import pension from "../../assets/images/mypage/pension.jpeg";
import { Category } from "../../components";
import HeartList from "./HeartList/HeartList";
import MyPostList from "./MyPostList/MyPostList";
import { recentPlace } from "./RecentList/RecentDummyData";
import RecentList from "./RecentList/RecentList";

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  min-height: calc(100vh - 380px);
  font-family: "ONE-Mobile-Regular";

  & > h1 {
    font-size: 42px;
  }
`;

const SUserContainer = styled.div`
  width: 100%;
  height: 895px;
  border: 2px solid ${({ theme }) => theme.colors.black050};
  display: flex;
  justify-content: center;
`;

const SMyInfo = styled.div`
  width: 25%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 82px;
  gap: 30px;

  & > div {
    font-size: 26px;
    gap: 20px;
  }
`;

const SLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  // gap: 26px;

  // & div {
  //   font-size: 20px;
  //   gap: 20px;
  // }
`;

const SMyContents = styled.div`
  width: 70%;
  overflow: auto;
  height: auto;
  // display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

const SBorderLine = styled.div`
  margin: 5% 0%;
  align-items: center;
  border-left: 1px solid ${({ theme }) => theme.colors.black050};
  height: 80%;
`;

const WritePost = styled.div`
  margin: 0px 0px 10px 0px;
  font-size: 20px;
`;

const MyPosts = styled.div`
  margin: 0px 0px 10px 0px;
  font-size: 20px;
`;

const RegistCompany = styled.div`
  margin: 0px 0px 10px 0px;
  font-size: 20px;
`;

const SButton = styled.div`
  display: flex;
  font-size: 20px;
  background-color: none;
  border: 1px solid ${({ theme }) => theme.colors.black050};
  border-radius: 8px;
`;

// const Line = styled.span`
//   margin: 5% 0%;
//   align-items: center;
//   border-left: 1px solid ${({ theme }) => theme.colors.black050};
//   height: 80%;
// `;

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
  // const getRecent = JSON.parse(localStorage.getItem("recentPlace"));
  // useEffect(() => {
  //   getRecent === null? localStorage.setItem("recentPlace", JSON.stringify([]))
  //     : null;
  // }, []);

  useEffect(() => {
    localStorage.setItem("recentPlace", JSON.stringify(recentPlace));
  }, []);

  const localstorageData = JSON.parse(
    localStorage.getItem("recentPlace") as string
  );
  return (
    <SContainer>
      <h1>마이페이지</h1>
      <SUserContainer>
        <SMyInfo>
          <img
            alt="예시"
            src="https://user-images.githubusercontent.com/104320234/191059694-ddd96c9a-c412-4a5b-9846-a4377bd516fa.png"
          />
          <div>Jin 님</div>
          <SLinkContainer>
            <WritePost>
              글 작성하기
              <MdArrowForwardIos />
            </WritePost>
            <MyPosts>
              내가 남긴 글
              <MdArrowForwardIos />
            </MyPosts>
            <RegistCompany>
              업주 등록
              <MdArrowForwardIos />
            </RegistCompany>
            <SButton>
              <SAsk1>1:1문의</SAsk1>
              {/* <Line>
                <div />
              </Line> */}
              <SAsk2>제휴문의</SAsk2>
            </SButton>
          </SLinkContainer>
        </SMyInfo>
        <SBorderLine>
          <div />
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
