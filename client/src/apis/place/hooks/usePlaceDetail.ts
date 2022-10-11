import { useInfiniteQuery, useQuery } from "react-query";

import { getPlaceDetail } from "../place";
import { getInfiniteReview } from "../review";

export const usePlaceDetail = (storeId: string, sortOption: string) => {
  const {
    data: detailData,
    isLoading,
    isSuccess,
  } = useQuery(["place", storeId], () => getPlaceDetail(storeId));

  const {
    data: reviewData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["review", storeId, sortOption],
    ({ pageParam = 1 }) => getInfiniteReview(storeId, sortOption, pageParam),
    {
      getNextPageParam: (lastPage) => {
        const { totalPages } = lastPage.data.reviews.pageInfo;
        if (lastPage.nextPage <= totalPages) {
          return lastPage.nextPage;
        }
        return undefined;
      },
    }
  );

  return {
    detailData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isSuccess,
    reviewData,
  };
};
