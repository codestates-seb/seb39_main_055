import { useInfiniteQuery, useQuery } from "react-query";

import { getPlaceDetail } from "../place";
import { getInfiniteReview } from "../review";

export const usePlaceDetail = (storeId: string) => {
  const { data: detailData, isLoading } = useQuery(["place", storeId], () =>
    getPlaceDetail(storeId)
  );

  const {
    data: reviewData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["review", storeId],
    ({ pageParam = 1 }) => getInfiniteReview(storeId, pageParam),
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
    reviewData,
  };
};
