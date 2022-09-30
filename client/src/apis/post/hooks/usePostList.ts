import { useInfiniteQuery } from "react-query";

import { getPostList } from "../post";

export const usePostList = () => {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery("post", ({ pageParam = 1 }) => getPostList(pageParam), {
    getNextPageParam: (lastPage) => {
      const { totalPages } = lastPage.pageInfo;
      if (lastPage.nextPage <= totalPages) {
        return lastPage.nextPage;
      }
      return undefined;
    },
  });

  return {
    data,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isFetching,
    isFetchingNextPage,
  };
};
