/* eslint-disable consistent-return */
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { getPostList } from "../../../apis";
import speaker from "../../../assets/icons/speaker.svg";
import { LoginModal, useModal } from "../../../components";
import { useAppSelector } from "../../../redux";
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

const useIntersection = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) => {
  const target = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    observer.observe(target.current as HTMLDivElement);
    return () => observer.disconnect();
  }, [callback, options]);

  return target;
};

const PostList = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const { loginStatus } = useAppSelector((state) => state.user);

  const handlePostButtonClick = () => {
    if (!loginStatus) {
      openModal(<LoginModal />);
      return;
    }

    navigate("/post/new");
  };

  type IntersectHandler = (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver
  ) => void;

  const useIntersect = (
    onIntersect: IntersectHandler,
    options?: IntersectionObserverInit
  ) => {
    const ref = useRef<HTMLDivElement>(null);
    const callback = useCallback(
      (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) onIntersect(entry, observer);
        });
      },
      [onIntersect]
    );

    useEffect(() => {
      if (!ref.current) return;

      const observer = new IntersectionObserver(callback, options);
      observer.observe(ref.current);

      return () => observer.disconnect();
    }, [ref, options, callback]);

    return ref;
  };

  const useFetchPostList = () => {
    const { data, hasNextPage, isFetching, fetchNextPage, isLoading } =
      useInfiniteQuery("post", ({ pageParam = 1 }) => getPostList(pageParam), {
        getNextPageParam: (lastPage) => {
          const { totalPages } = lastPage.pageInfo;
          if (lastPage.nextPage <= totalPages) {
            return lastPage.nextPage;
          }
          return undefined;
        },
        onSuccess: (data) => console.log(data),
      });

    return { data, hasNextPage, isFetching, fetchNextPage, isLoading };
  };

  const { data, hasNextPage, isFetching, fetchNextPage, isLoading } =
    useFetchPostList();

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  });

  const list = useMemo(
    () => (data ? data.pages.flatMap(({ data }) => data) : []),
    [data]
  );

  console.log(list);

  if (isLoading) {
    return <div>Loading</div>;
  }

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
        {list.map((data) => (
          <PostCard key={data?.threadId} data={data} />
        ))}
      </SListContainer>
      <div ref={ref}>target</div>
    </SContainer>
  );
};

export default PostList;
