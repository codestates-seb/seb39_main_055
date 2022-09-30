import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { usePostList } from "../../../apis";
import speaker from "../../../assets/icons/speaker.svg";
import { LoadingSpinner, LoginModal, useModal } from "../../../components";
import { useIntersect } from "../../../hooks";
import { useAppSelector } from "../../../redux";
import PostCard from "./PostCard/PostCard";

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
    font-size: 40px;
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

export const SLoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 800px);
`;

export const SFetchContainer = styled.section`
  margin-bottom: 70px;
`;

const PostList = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const { loginStatus } = useAppSelector((state) => state.user);

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isFetching,
    isFetchingNextPage,
  } = usePostList();

  const postList = useMemo(
    () => (data ? data.pages.flatMap(({ data }) => data) : []),
    [data]
  );

  const observedTarget = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  });

  const handlePostButtonClick = () => {
    if (!loginStatus) {
      openModal(<LoginModal />);
      return;
    }

    navigate("/post/new");
  };

  return (
    <SContainer>
      <STitleContainer>
        <img src={speaker} alt="speaker" />
        <h1>댕댕이숲</h1>
      </STitleContainer>
      <SButtonContainer>
        <button type="button" onClick={handlePostButtonClick}>
          글 작성
        </button>
      </SButtonContainer>
      <SListContainer>
        {isLoading ? (
          <SLoadingContainer>
            <LoadingSpinner />
          </SLoadingContainer>
        ) : (
          postList.map((data) => <PostCard key={data?.threadId} data={data} />)
        )}
      </SListContainer>
      <div ref={observedTarget} />
      {isFetchingNextPage && (
        <SFetchContainer>
          <LoadingSpinner />
        </SFetchContainer>
      )}
    </SContainer>
  );
};

export default PostList;
