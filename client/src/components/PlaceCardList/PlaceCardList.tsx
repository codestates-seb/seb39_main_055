/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/no-array-index-key */
/* eslint-disable consistent-return */
import { MouseEvent, MutableRefObject, Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BsSortDown } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import useListPlaces, {
  sortOptions,
  SortTypes,
} from "../../apis/place/useListPlaces";
import { useCloseElement } from "../../hooks";
import { selectUser, selectUserInfos, useAppSelector } from "../../redux";
import { Review, UserInfos } from "../../types";
import { averageStar, calculateDistance, isKeyOf } from "../../utils";
import { ErrorModal, LoginModal, useModal } from "../Modal";
import PlaceCard from "../PlaceCard/PlaceCard";
import PlaceCardError from "../PlaceCard/PlaceCardError";
import PlaceSkeleton from "../Skeleton/PlaceCardSkeleton";
import {
  NoSearchResult,
  SBottomBox,
  SButton,
  SButtonBox,
  SFilterUList,
  SList,
  SSection,
  SUList,
} from "./style";

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
    const isLiked = heartUserList.has(userId);
    const avgRating = Number(averageStar(reviews));
    const distance = calculateDistance(
      [userLat, userLon],
      [latitude, longitude]
    );
    const [province, district] = addressName.match(/(.*?)[???|???|???](?=\s)/g)!;

    // ?????????, ???????????? "???"?????? ????????? ??????(ex. ????????? ??????, ????????? ?????????)
    // ?????????, ???????????? addressName??? OO?????? ??????????????? province ????????? 3 ??????
    if (province.length <= 3) {
      addressName = `${province}${district}`;
    }
    // ??? ?????? ?????? ???, ?????? "???/???"?????? ????????? ??????(ex. ?????? ?????????, ?????? ?????????)
    if (province.length > 3) {
      addressName = province;
    }

    return (
      <Suspense fallback={<PlaceSkeleton />} key={storeId}>
        <ErrorBoundary
          fallback={
            <PlaceCardError
              location={addressName}
              storeName={storeName}
              averageRating={avgRating}
              reviews={reviews.length}
              distance={distance}
              storeId={storeId}
              isLiked={isLiked}
            />
          }
        >
          <PlaceCard
            image={storeImages[0]?.storeImage}
            alt={`${storeName}??? ?????? ?????????`}
            location={addressName}
            storeName={storeName}
            averageRating={avgRating}
            reviews={reviews.length}
            distance={distance}
            storeId={storeId}
            isLiked={isLiked}
          />
        </ErrorBoundary>
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
  // ??????????????? ????????? Skeleton??? ???????????? ?????? ?????? ?????? ?????????
  const dummyArr = new Array(itemsPerPage.current).fill(0);
  const data = result || [];

  // ?????? ??????(allResults.current)??? ????????? ?????? ?????????????????? ????????? Skeleton??? ????????? ????????? ??????
  if (current && !current.length) return [];
  if (!isFetching) return data;

  // 1. ??????????????? ???????????? ???(result === undefined), 2. API ????????? ????????? ???, ????????? Skeleton??? ?????????
  return data.concat(dummyArr);
}

function errorHandler(result: StoreList[], isError: boolean) {
  let title = "";

  if (isError) {
    title = "??? ??? ?????? ????????? ??????????????????. (?????????)";
  }
  if (!isError && result) {
    title = "????????? ????????????. (???_???)";
  }

  return <NoSearchResult title={title} height="650px" />;
}

const sortKeys = Object.keys(sortOptions) as (keyof typeof sortOptions)[];

interface ResultListProps {
  category: string;
  keyword?: string;
}
const PlaceList = ({ keyword, category }: ResultListProps) => {
  const [isTabOpen, setIsTabOpen, tabRef] = useCloseElement();
  const [sort, setSort] = useState<SortTypes>("distance");
  const navigate = useNavigate();
  const { openModal } = useModal();
  const { loginStatus, userInfos } = useAppSelector(selectUser);
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
    setIsTabOpen((prev) => !prev);
  };

  const handleNewPlaceClick = () => {
    if (!loginStatus) {
      openModal(<LoginModal />);
      return;
    }

    if (userInfos?.userRole === "ROLE_USER") {
      openModal(
        <ErrorModal
          body="????????? ??????????????? ????????? ????????? ???????????????."
          buttonText="????????? ????????????"
          callback={() => navigate("/business")}
        />
      );
      return;
    }

    navigate("/place/new");
  };

  const places = matchDataToStatus(isFetching, items, allResult, itemsPerPage);

  return (
    <SSection>
      <SButtonBox>
        <SButton onClick={handleNewPlaceClick}>?????? ??????</SButton>
        <SButton type="button" onClick={toggleFilterList}>
          <BsSortDown />
          ??????
        </SButton>
      </SButtonBox>

      <SFilterUList isOpen={isTabOpen} onClick={handleSort} ref={tabRef}>
        {sortKeys.map((sortName) => (
          <SList selected={sortOptions[sortName] === sort} key={sortName}>
            {sortName}
          </SList>
        ))}
      </SFilterUList>
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
