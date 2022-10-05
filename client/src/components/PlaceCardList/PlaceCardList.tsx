/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/no-array-index-key */
/* eslint-disable consistent-return */
import { MouseEvent, MutableRefObject, Suspense, useState } from "react";
import { BsSortDown } from "react-icons/bs";

import useListPlaces from "../../apis/place/useListPlaces";
import { selectUserInfos, useAppSelector } from "../../redux";
import { UserInfos } from "../../types";
import { averageStar, calculateDistance, isKeyOf } from "../../utils";
import PlaceCard from "../PlaceCard/PlaceCard";
import PlaceSkeleton from "../Skeleton/PlaceCardSkeleton";
import {
  NoSearchResult,
  SBottomBox,
  SButton,
  SButtonBox,
  SFilterUList,
  SLink,
  SList,
  SSection,
  SUList,
} from "./style";

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

type UserCoordinate = [number | undefined, number | undefined];

const renderPlaceCards = (
  data: StoreList[] | number[],
  [userLat, userLon]: UserCoordinate,
  userId = -1
) => {
  return data.map((e, i) => {
    if (typeof e === "number") return <PlaceSkeleton key={`${i}th-Skeleton`} />;

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

    const heartUserList = new Set(heartUserId);
    const avgRating = Number(averageStar(reviews));
    const distance = calculateDistance(
      [userLat, userLon],
      [latitude, longitude]
    );
    const [province, district] = addressName.match(/(.*?)[시|구|군]/g)!;

    // 특별시, 광역시는 "구"까지 주소를 자름(ex. 서울시 중구, 대전시 대덕구)
    // 특별시, 광역시의 addressName은 OO시로 표현되므로 province 길이가 3 이하
    if (province.length <= 3) {
      addressName = `${province}${district}`;
    }
    // 도 내의 일반 시, 군은 "시/군"까지 주소를 자름(ex. 경기 성남시, 강원 고성군)
    if (province.length > 3) {
      addressName = province;
    }

    const isLiked = heartUserList.has(userId);

    return (
      <Suspense fallback={<PlaceSkeleton />} key={storeId}>
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
      </Suspense>
    );
  });
};

function matchDataToStatus(
  isFetching: boolean,
  result: StoreList[] | undefined,
  allResult: MutableRefObject<StoreList[] | undefined>,
  itemsPerPage: MutableRefObject<number>
) {
  const { current } = allResult;
  // 로딩중임을 알려줄 Skeleton을 보여주기 위해 더미 배열 덧붙임
  const dummyArr = new Array(itemsPerPage.current).fill(0);
  const data = result || [];

  // 전체 결과(allResults.current)가 없으면 다른 카테고리에서 로딩중 Skeleton을 덧붙일 필요가 없음
  if (current && !current.length) return [];
  if (!isFetching) return data;

  // 1. 컴포넌트가 마운트될 때(result === undefined), 2. API 응답을 기다릴 때, 로딩중 Skeleton을 덧붙임
  return data.concat(dummyArr);
}

function errorHandler(result: StoreList[], isError: boolean) {
  let title = "";

  if (isError) {
    title = "알 수 없는 오류가 발생했습니다. (¯―¯٥)";
  }
  if (!isError && result) {
    title = "결과가 없습니다. (⚲_⚲)";
  }

  return <NoSearchResult title={title} height="650px" />;
}

const sortOptions = {
  거리순: "distance",
  최신순: "createdAt",
};

interface ResultListProps {
  category: string;
  keyword?: string;
}
const PlaceList = ({ keyword, category }: ResultListProps) => {
  const [filterMount, setFilterMount] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sort, setSort] = useState<"distance" | "createdAt">();
  const { longitude, latitude, userId } = useAppSelector(selectUserInfos) || {};
  const { items, allResult, isFetching, isError, bottomRef, itemsPerPage } =
    useListPlaces({ category, longitude, latitude, keyword, sort });

  const handleSort = (e: MouseEvent) => {
    if (!(e.target instanceof Element) || !e.target.textContent) return;
    const sort = e.target.textContent;

    if (isKeyOf(sort, sortOptions)) {
      setSort(sortOptions[sort] as "distance" | "createdAt");
    }
    toggleFilterList();
  };

  const toggleFilterList = () => {
    if (!filterMount) {
      setFilterMount(true);
      setTimeout(() => setFilterOpen(true), 0);
      return;
    }
    setFilterOpen(false);
    setTimeout(() => setFilterMount(false), 400);
  };

  const places = matchDataToStatus(isFetching, items, allResult, itemsPerPage);

  return (
    <SSection>
      <SButtonBox>
        <SLink to="/">업주 등록</SLink>
        <SButton type="button" onClick={toggleFilterList}>
          <BsSortDown />
          필터
        </SButton>
      </SButtonBox>

      {filterMount && (
        <SFilterUList isOpen={filterOpen} onClick={handleSort}>
          <SList>거리순</SList>
          <SList>최신순</SList>
        </SFilterUList>
      )}
      {places.length > 0 ? (
        <SUList>
          {renderPlaceCards(places, [latitude, longitude], userId)}
        </SUList>
      ) : (
        errorHandler(places, isError)
      )}
      <SBottomBox ref={bottomRef} />
    </SSection>
  );
};

export default PlaceList;
