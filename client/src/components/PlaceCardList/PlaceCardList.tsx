/* eslint-disable react/no-array-index-key */
/* eslint-disable consistent-return */
import { MutableRefObject } from "react";

import useListPlaces from "../../apis/place/useListPlaces";
import { selectUserInfos, useAppSelector } from "../../redux";
import { PageInfo, UserInfos } from "../../types";
import { averageStar, calculateDistance } from "../../utils";
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
    title = "검색 결과가 없습니다. (⚲_⚲)";
  }

  return <NoSearchResult title={title} height="650px" />;
}

interface ResultListProps {
  category: string;
  keyword?: string;
}
const PlaceList = ({ keyword, category }: ResultListProps) => {
  const { longitude, latitude } = useAppSelector(selectUserInfos) || {};
  const { items, allResult, isFetching, isError, bottomRef, itemsPerPage } =
    useListPlaces({ category, longitude, latitude, keyword });

  const places = matchDataToStatus(isFetching, items, allResult, itemsPerPage);

  return (
    <>
      {places.length > 0 ? (
        <SUList>{renderPlaceCards(places, [latitude, longitude])}</SUList>
      ) : (
        errorHandler(places, isError)
      )}
      <SBottomBox ref={bottomRef} />
    </>
  );
};

export default PlaceList;
