/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";

import { mappedCategories } from "../../constants";
import { selectUserInfos, useAppSelector } from "../../redux";
import { PageInfo, UserInfos } from "../../types";
import { averageStar, axiosInstance, calculateDistance } from "../../utils";
import PlaceCard from "../PlaceCard/PlaceCard";
import PlaceSkeleton from "../Skeleton/PlaceCardSkeleton";
import { NoSearchResult, SBottomBox, SUList } from "./style";

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

type UserCoordinate = [number | undefined, number | undefined];

const renderPlaceCards = (
  data: StoreList[] | number[],
  [userLat, userLon]: UserCoordinate
) => {
  return data.map((e, i) => {
    if (typeof e === "number") return <PlaceSkeleton key={i} />;

    const {
      storeId,
      storeName,
      storeImages,
      reviews,
      heartUserId,
      longitude,
      latitude,
    } = e;
    let { addressName } = e;
    if (!userLat || !userLon) return;

    const avgRating = Number(averageStar(reviews));
    const distance = calculateDistance(
      [userLat, userLon],
      [latitude, longitude]
    );
    const [province, district] = addressName.match(/(.*?)[시|구]/g)!;

    // 특별시, 광역시는 "구"까지 주소를 자름(ex. 서울시 중구, 대전시 대덕구)
    // 특별시, 광역시의 addressName은 OO시로 표현되므로 province 길이가 3 이하
    if (province.length <= 3) {
      addressName = `${province}${district}`;
    }
    // 도 내의 일반 시는 "시"까지 주소를 자름(ex. 경기도 성남시)
    if (province.length > 3) {
      addressName = province;
    }

    return (
      <PlaceCard
        image={storeImages[0]?.storeImage}
        alt={`${storeName}의 대표 이미지`}
        location={addressName}
        storeName={storeName}
        averageRating={avgRating}
        reviews={reviews.length}
        distance={distance}
        storeId={storeId}
        key={storeId}
      />
    );
  });
};

interface ResultListProps {
  keyword: string;
  category: string;
}
const PlaceList = ({ keyword, category }: ResultListProps) => {
  const bottom = useRef<HTMLDivElement>(null);
  const size = useRef(16);
  const allResults = useRef<StoreList[] | undefined>();
  const { longitude, latitude } = useAppSelector(selectUserInfos) || {};
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
    SearchResponse,
    unknown,
    StoreList
  >(
    ["search", keyword, category, longitude, latitude],
    async ({ pageParam = 1 }) => {
      if (!(category in mappedCategories)) return;

      // 카테고리: 클라이언트의 category 쿼리 스트링과 서버 API 요청 URL이 다른 부분 맞춰줌
      const serverCategory =
        mappedCategories[category as keyof typeof mappedCategories];
      const { data } = await axiosInstance(
        `v1/store/search?keyword=${keyword}&category=${serverCategory}&page=${pageParam}&size=${
          size.current
        }&sort=${`distance`}&latitude=${latitude}&longitude=${longitude}`
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
        if (category === "all") {
          allResults.current = pages;
        }
      },
    }
  );

  useEffect(() => {
    if (!bottom.current) return;

    const options = {
      rootMargin: "50px",
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    }, options);

    io.observe(bottom.current);

    return () => io.disconnect();
  }, [hasNextPage]);

  const results = data?.pages || [];
  const places =
    isFetching && allResults.current?.length
      ? results.concat(new Array(size.current).fill(0))
      : results;

  return (
    <>
      {isFetching || places.length ? (
        <SUList>{renderPlaceCards(places, [latitude, longitude])}</SUList>
      ) : (
        <NoSearchResult title="검색 결과가 없습니다." height="650px" />
      )}
      <SBottomBox ref={bottom} />
    </>
  );
};

export default PlaceList;
