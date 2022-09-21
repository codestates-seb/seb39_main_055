import styled from "styled-components";

import PostCard from "./PostCard";

export const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 380px);
  font-family: "Noto Sans KR", sans-serif;
  margin: 110px 0;

  & > h1 {
    margin-bottom: 50px;
    font-size: 35px;
    font-weight: 500;
  }

  @media screen and (max-width: 800px) {
    padding: 20px;
  }
`;

export const SListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;

  @media screen and (max-width: 800px) {
    gap: 80px;
  }
`;

const PostList = () => {
  return (
    <SContainer>
      <h1>댕댕이숲</h1>
      <SListContainer>
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </SListContainer>
    </SContainer>
  );
};

export default PostList;
