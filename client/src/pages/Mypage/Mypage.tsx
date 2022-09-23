import React from "react";
import styled from "styled-components";

import HeartList from "./HeartList/HeartList";

interface Props {
  image: string;
  category: string;
  alt: string;
  adress: string;
  text: string;
  link: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  margin: 200px 0;
  min-height: calc(100vh - 380px);

  & > h1 {
    font-size: 42px;
  }
`;

const UserContainer = styled.div`
  width: 100%;
  height: 895px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
`;

const MyInfo = styled.div`
  width: 25%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 100px;
  gap: 20px;
  border: 1px solid red;
  font-size: 24px;

  & > div:first-child {
    font-size: 26px;
  }
`;

const MyContents = styled.div`
  width: 75%;
  height: auto;
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 20px;
  gap: 20px;
`;

// const HeartList = styled.div`
//   height: 33%;
//   width: 100%;
//   border: 1px solid red;
// `;

const RecentList = styled.div`
  height: 33%;
  width: 100%;
  border: 1px solid red;
`;

const Editbutton = styled.span`
  position: absolute;
  top: 58%;
  left: 23%;
`;

const MyPostList = styled.div`
  height: 33%;
  width: 100%;
  border: 1px solid red;
`;

const Button = styled.button`
  display: flex;
  font-size: 20px;
`;

const Mypage = () => {
  return (
    <Container>
      <h1>마이페이지</h1>
      <UserContainer>
        <MyInfo>
          <img
            alt="예시"
            src="https://user-images.githubusercontent.com/104320234/191059694-ddd96c9a-c412-4a5b-9846-a4377bd516fa.png"
          />
          <Editbutton>
            <img
              alt="이미지 수정버튼"
              src="https://user-images.githubusercontent.com/104320234/191094430-9782110c-74e8-4b5e-a579-34ece4b9b712.png"
            />
          </Editbutton>
          <div>Jin 님</div>
          <div>글 작성하기</div>
          <div>내가 남긴 글</div>
          <div>업주 등록</div>
          <Button>
            <div>1:1문의</div>
            <div>제휴문의</div>
          </Button>
        </MyInfo>
        <MyContents>
          <HeartList />
          <RecentList>recent</RecentList>
          <MyPostList>mypost</MyPostList>
        </MyContents>
      </UserContainer>
    </Container>
  );
};

export default Mypage;
