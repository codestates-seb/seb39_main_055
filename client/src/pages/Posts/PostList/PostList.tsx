import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { usePostList } from "../../../apis";
import speaker from "../../../assets/icons/speaker.svg";
import { LoadingSpinner, LoginModal, useModal } from "../../../components";
import { useIntersect } from "../../../hooks";
import { useAppSelector } from "../../../redux";
import PostCard from "./PostCard/PostCard";
import {
  SButtonContainer,
  SContainer,
  SFetchContainer,
  SListContainer,
  SLoadingContainer,
  STitleContainer,
} from "./style";

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
