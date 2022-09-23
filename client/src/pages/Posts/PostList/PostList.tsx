import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import speaker from "../../../assets/icons/speaker.svg";
import PostCard from "./PostCard/PostCard";
import { postData } from "./PostData";

export const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 380px);

  @media screen and (max-width: 800px) {
    padding: 20px;
  }
`;

export const SListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  margin-bottom: 70px;

  @media screen and (max-width: 800px) {
    gap: 80px;
  }
`;

export const STitleContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  width: 100%;
  margin: 60px 0 20px 0;

  & > h1 {
    color: #161616;
    font-size: 32px;
  }
`;

export const SButtonContainer = styled.section`
  display: flex;
  justify-content: end;
  width: 100%;
  margin-bottom: 45px;

  & > button {
    width: 100px;
    height: 50px;
    border: 1px solid #a5a5a5;
    border-radius: 20px;
    color: #000000;
    background-color: #ffffff;
    font-size: 20px;
    font-weight: 600;
    transition: all 0.4s;

    &:hover {
      color: #ffffff;
      background-color: #ffc107;
      border-color: #ffc107;
    }
  }
`;

const PostList = () => {
  const navigate = useNavigate();

  return (
    <SContainer>
      <STitleContainer>
        <img src={speaker} alt="speaker" />
        <h1>댕댕이숲</h1>
      </STitleContainer>
      <SButtonContainer>
        <button type="button" onClick={() => navigate("/post/new")}>
          글 작성
        </button>
      </SButtonContainer>
      <SListContainer>
        {postData.map((data) => (
          <PostCard
            key={data.threadId}
            postId={data.threadId}
            postImage={data.threadImages}
            userImage={data.user.image}
            nickName={data.user.ninkname}
            updatedAt={data.updatedAt}
            body={data.body}
            likes={data.likes}
            comments={5}
          />
        ))}
      </SListContainer>
    </SContainer>
  );
};

export default PostList;
