/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable consistent-return */
import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { Navigate, useSearchParams } from "react-router-dom";

import { Category, PlaceCard } from "../../components";
import { searchCategories } from "../../constants";
import { selectUserInfos, useAppSelector } from "../../redux";
import { PageInfo, UserInfos } from "../../types";
import { averageStar, axiosInstance, calculateDistance } from "../../utils";
import SearchHeader from "./SearchHeader/SearchHeader";
import { SBottomBox, SBox, SH1, SUList } from "./style";

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

interface SearchResponse {
  data: StoreList[];
  pageInfo: PageInfo;
}

const mappedCategories = {
  all: "total",
  room: "숙소",
  barber: "미용",
  cafe: "카페",
  restaurant: "맛집",
  playground: "운동장",
  hospital: "동물병원",
};

type UserCoordinate = [number | undefined, number | undefined];

const renderPlaceCards = (
  data: StoreList[],
  [userLat, userLon]: UserCoordinate
) => {
  return data.map(
    ({
      storeId,
      addressName,
      storeName,
      storeImages,
      reviews,
      heartUserId,
      longitude,
      latitude,
    }) => {
      if (!userLat || !userLon) return;

      const avgRating = Number(averageStar(reviews));
      const distance = calculateDistance(
        [userLat, userLon],
        [latitude, longitude]
      );
      const [province, district] = addressName.match(/(.*?)[시|구]/g)!;

      if (province.length < 5) {
        addressName = `${province}${district}`;
      }
      if (province.length >= 5) {
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
          key={storeId}
        />
      );
    }
  );
};

const Search = () => {
  const { nickname, longitude, latitude } =
    useAppSelector(selectUserInfos) || {};
  const [params] = useSearchParams();

  const keyword = params.get("search");
  const category = params.get("category") || "all";

  const bottom = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<SearchResponse, unknown, StoreList>(
      ["search", keyword, category, longitude, latitude],
      async ({ pageParam = 1 }) => {
        const serverCategory =
          mappedCategories[category as keyof typeof mappedCategories];
        const { data } = await axiosInstance(
          `v1/store/search?keyword=${keyword}&category=${serverCategory}&page=${pageParam}&size=16&sort=${`distance`}&latitude=${latitude}&longitude=${longitude}`
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
          const transformedPages = data.pages.map(({ data }) => data).flat();

          return { ...data, pages: transformedPages };
        },
      }
    );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [keyword]);

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

  if (!(category in mappedCategories)) {
    return <Navigate to="/not-found" />;
  }

  return (
    <SBox>
      <SearchHeader
        resultHeader={<SH1>{`‘${keyword}’에 대한 검색 결과입니다.`}</SH1>}
        category={
          <Category
            menuList={searchCategories}
            baseQueryString={`?search=${keyword}`}
            extraQueryString="category"
          />
        }
      />

      <SUList>
        {results.length ? (
          renderPlaceCards(results, [latitude, longitude])
        ) : (
          <div>검색 결과가 없습니다.</div>
        )}
      </SUList>
      <SBottomBox ref={bottom} />
    </SBox>
  );
};

export default Search;
