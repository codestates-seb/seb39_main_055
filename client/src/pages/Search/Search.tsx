/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable consistent-return */
import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { Navigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";

import { Category, Circle, PlaceCard, Rectangle } from "../../components";
import { Skelcontainer } from "../../components/Skeleton/styles";
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
          key={storeId}
        />
      );
    }
  );
};

const Skeleton = styled(Skelcontainer)`
  display: flex;
  flex-flow: column nowrap;
  row-gap: 8px;
`;

const SkeletonFooter = styled.div`
  display: flex;
  flex-flow: row nowrap;
  column-gap: 4px;
`;

const Search = () => {
  const { longitude, latitude } = useAppSelector(selectUserInfos) || {};
  const [params] = useSearchParams();
  const bottom = useRef<HTMLDivElement>(null);
  const size = useRef(16);

  const keyword = params.get("search");
  const category = params.get("category") || "all";

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery<SearchResponse, unknown, StoreList>(
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
        enabled: true /* !!(longitude && latitude) */,
        retry: 2,
        refetchOnWindowFocus: false,
        getNextPageParam: (data, alldata) => {
          const { pageInfo } = data;
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
        onSettled: (data) => console.log(data),
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
  const places = isFetching
    ? results.concat(new Array(size.current).fill(0))
    : results;

  console.log(isFetching);
  console.log(results);

  // 유저가 존재하지 않는 카테고리로 주소를 변경하면 NotFound 페이지로 이동
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
        <Skeleton width="100%" height="340px">
          <Rectangle width="100%" height="235px" />
          <Rectangle width="60%" height="20px" />
          <Rectangle width="100%" height="40px" />
          <SkeletonFooter>
            {/* <Circle width="" height="" radius="20px" /> */}
            <Rectangle width="20%" height="20px" />
          </SkeletonFooter>
        </Skeleton>
      </SUList>
      <SBottomBox ref={bottom} />
    </SBox>
  );
};

export default Search;
