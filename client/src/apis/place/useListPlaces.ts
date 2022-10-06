/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";

import { mappedCategories } from "../../constants";
import { PageInfo, UserInfos } from "../../types";
import { axiosInstance } from "../../utils";

export interface Review {
  reviewId: string;
  createdAt: string;
  updatedAt: string;
  reviewStatus: string;
  user: UserInfos;
  storeId: string;
  body: string;
  score: number;
}

export interface StoreList {
  storeId: string;
  createdAt: string;
  updatedAt: string;
  storeStatus: string;
  category: string;
  longitude: number;
  latitude: number;
  storeName: string;
  addressName: string;
  body: string;
  phone: string;
  homepage: string;
  storeImages: { storeImage: string }[];
  user: UserInfos;
  reviews: Review[];
  heartUserId: number[];
}

interface SearchResponse {
  data: StoreList[];
  pageInfo: PageInfo;
}

type TypeOfKeys<T> = {
  [P in keyof T]: T[P];
}[keyof T];

export type SortTypes = TypeOfKeys<SortOptions>;

interface UseListPlacesParams {
  category: string;
  longitude?: number;
  latitude?: number;
  keyword?: string;
  sort?: SortTypes;
}

interface SortOptions {
  거리순: "distance";
  최신순: "createdAt";
  리뷰수순: "reviewCount";
  별점순: "score";
}

export const sortOptions: SortOptions = {
  거리순: "distance",
  최신순: "createdAt",
  리뷰수순: "reviewCount",
  별점순: "score",
};

const useListPlaces = ({
  category,
  longitude,
  latitude,
  keyword,
  sort = "distance",
}: UseListPlacesParams) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = useRef(16);
  const allResult = useRef<StoreList[] | undefined>();
  const { data, fetchNextPage, hasNextPage, isFetching, isError } =
    useInfiniteQuery<SearchResponse, unknown, StoreList>(
      ["placeList", keyword, category, longitude, latitude, sort],
      async ({ pageParam = 1 }) => {
        if (!(category in mappedCategories)) return;

        const keywordParam = keyword ? `/search?keyword=${keyword}&` : "?";
        // 카테고리: 클라이언트의 category 쿼리 스트링과 서버 API 요청 URL이 다른 부분 맞춰줌
        const serverCategory =
          mappedCategories[category as keyof typeof mappedCategories];
        const { data } = await axiosInstance(
          `v1/store${keywordParam}category=${serverCategory}&page=${pageParam}&size=${itemsPerPage.current}&sort=${sort}&latitude=${latitude}&longitude=${longitude}`
        );

        return data;
      },
      {
        enabled: !!(longitude && latitude),
        retry: 2,
        refetchOnWindowFocus: false,
        getNextPageParam: ({ pageInfo }) => {
          const { page, totalPages } = pageInfo;
          let nextPage: number | undefined = page + 1;

          if (nextPage > totalPages) {
            nextPage = undefined;
          }

          return nextPage;
        },
        select: (data) => {
          // UI에 나타낼 때, 서버 데이터의 data 속성만 필요하지만 아무 처리 없이 사용할 경우,
          // data.pages[i].data로 데이터를 맵핑해야 해 번거로워짐
          const transformedPages = data.pages.map(({ data }) => data).flat();

          return { ...data, pages: transformedPages };
        },
        onSettled: (data) => {
          const { pages } = data || {};

          // allResults: 전체 검색 결과를 저장해 검색 결과가 없으면 다른 카테고리에서 로딩 Skeleton을 보여주지 않도록 함
          if (category === "all") {
            allResult.current = pages;
          }
        },
      }
    );

  useEffect(() => {
    if (!bottomRef.current) return;

    const options = {
      rootMargin: "50px",
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    }, options);

    io.observe(bottomRef.current);

    return () => io.disconnect();
  }, [hasNextPage]);

  const items = data?.pages;

  return {
    items,
    allResult,
    hasNextPage,
    isFetching,
    isError,
    bottomRef,
    itemsPerPage,
  };
};

export default useListPlaces;
