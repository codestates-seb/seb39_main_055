/* eslint-disable react/no-array-index-key */
/* eslint-disable consistent-return */
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

type QueryFn<T> = (
  pageParam: number,
  category: string,
  extrArgs: T
) => Promise<StoreList[]>;

interface ResultListProps {
  category: string;
  keyword?: string;
}
const PlaceList = ({ keyword, category }: ResultListProps) => {
  const { longitude, latitude } = useAppSelector(selectUserInfos) || {};
  const { data, allResults, isFetching, bottomRef, itemsPerPage } =
    useListPlaces({ category, longitude, latitude, keyword });

  const results = data?.pages || [];
  const places =
    isFetching && allResults.current?.length
      ? results.concat(new Array(itemsPerPage.current).fill(0))
      : results;

  return (
    <>
      {isFetching || places.length ? (
        <SUList>{renderPlaceCards(places, [latitude, longitude])}</SUList>
      ) : (
        <NoSearchResult title="검색 결과가 없습니다." height="650px" />
      )}
      <SBottomBox ref={bottomRef} />
    </>
  );
};

export default PlaceList;
