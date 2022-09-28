/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { Navigate, useSearchParams } from "react-router-dom";

import { Category, PlaceCard, SearchBar } from "../../components";
import { searchCategories } from "../../constants";
import {
  changeUserAddress,
  selectUserInfos,
  useAppDispatch,
  useAppSelector,
} from "../../redux";
import { PageInfo, UserInfos } from "../../types";
import { averageStar, axiosInstance } from "../../utils";
import { SBottomBox, SBox, SH1, SHeader, SP, SSpan, SUList } from "./style";

const dummy: StoreList[] = [
  {
    storeId: "8",
    createdAt: "2022-09-27T20:05:11",
    updatedAt: "2022-09-27T20:05:11",
    storeStatus: "STORE_EXIST",
    category: "숙소",
    longitude: 126.770299659574,
    latitude: 37.6897115089898,
    storeName: "테스트123123",
    addressName:
      "경기 고양시 일산서구 일청로59번길 55 (일산동, 미주8차저층APT)",
    body: "www.test.comwww.test.comwww.test.com",
    phone: "010-1111-1111",
    homepage: "www.test.com",
    user: {
      nickname: "모상빈",
      email: "mosangbin@gmail.com",
      image:
        "https://mblogthumb-phinf.pstatic.net/MjAyMDA2MTBfMTY1/MDAxNTkxNzQ2ODcyOTI2.Yw5WjjU3IuItPtqbegrIBJr3TSDMd_OPhQ2Nw-0-0ksg.8WgVjtB0fy0RCv0XhhUOOWt90Kz_394Zzb6xPjG6I8gg.PNG.lamute/user.png?type=w800",
      userStatus: "USER_EXIST",
      longitude: 127.044744776173,
      latitude: 37.3044825535735,
      userRole: "ROLE_OWNER",
    },
    storeImages: [
      {
        storeImage:
          "https://main055.s3.ap-northeast-2.amazonaws.com/user3-b9cedaf17a7f80cb5a0e14e805f8825f1664276710274.png",
      },
    ],
    reviews: [],
    heartUserId: [3],
  },
  {
    storeId: "1",
    createdAt: "2022-09-26T20:10:50",
    updatedAt: "2022-09-27T23:57:19",
    storeStatus: "STORE_EXIST",
    category: "숙소",
    longitude: 100.0,
    latitude: 100.0,
    storeName: "동작을 점령해버린 숙소! 14호점",
    addressName: "서울시 동작구 흑석동 123-123",
    body: "진료 전 메뉴 500원",
    phone: "010-1234-1234",
    homepage: "http://동작을 점령해버린 숙소.com",
    user: {
      nickname: "psy001",
      email: "psy1@gmail.com",
      image:
        "https://main055.s3.ap-northeast-2.amazonaws.com/user2-e4ebbe042cfb2c8dbdfbb72ee3c764f11664189442402.jpeg",
      userStatus: "USER_EXIST",
      longitude: 127.074928451599,
      latitude: 37.6322400488783,
      userRole: "ROLE_OWNER",
    },
    storeImages: [
      {
        storeImage:
          "https://main055.s3.ap-northeast-2.amazonaws.com/user1-nurung1663583751271.png",
      },
    ],
    reviews: [
      {
        reviewId: "3",
        createdAt: "2022-09-26T17:37:19",
        updatedAt: "2022-09-26T17:37:19",
        reviewStatus: "REVIEW_EXIST",
        user: {
          nickname: "psy2인데요",
          email: "psy2@gmail.com",
          image:
            "https://mblogthumb-phinf.pstatic.net/MjAyMDA2MTBfMTY1/MDAxNTkxNzQ2ODcyOTI2.Yw5WjjU3IuItPtqbegrIBJr3TSDMd_OPhQ2Nw-0-0ksg.8WgVjtB0fy0RCv0XhhUOOWt90Kz_394Zzb6xPjG6I8gg.PNG.lamute/user.png?type=w800",
          userStatus: "USER_EXIST",
          longitude: 126.75036638,
          latitude: 37.50265438,
          userRole: "ROLE_OWNER",
        },
        storeId: "1",
        body: "이 동물병원 괜찮아요! 굿! 별점 5점 드립니다",
        score: 3,
      },
    ],
    heartUserId: [2, 3],
  },
  {
    storeId: "5",
    createdAt: "2022-09-27T15:28:21",
    updatedAt: "2022-09-27T19:06:56",
    storeStatus: "STORE_EXIST",
    category: "숙소",
    longitude: 129.116665046345,
    latitude: 37.5745168573281,
    storeName: "동해를그리다 펜션",
    addressName: "강원 동해시 일출로 377 (대진동, Pygmalion Effect)",
    body: "강원도 동해시에 위치한 [동해를 그리다] 펜션입니다.\n\n도보 5분 거리에 어달 해수욕장과 망상 해수욕장이 인접하여 있어 여름철 신나는 물놀이가 가능하며\n사계절 해변 산책이 가능합니다.\n\n펜션 인근에서 낚시 배 체험이 가능하여,\n사랑하는 가족, 친구들과 함께 보다 즐거운 추억을 쌓으실 수 있습니다.\n\n또한 전 객실 바베큐장 이용이 가능하며, 펜션 내 와이파이 사용이 가능합니다.",
    phone: "010-5406-2209",
    homepage: "http://greeda-donghae.co.kr/",
    user: {
      nickname: "모상빈",
      email: "mosangbin@gmail.com",
      image:
        "https://mblogthumb-phinf.pstatic.net/MjAyMDA2MTBfMTY1/MDAxNTkxNzQ2ODcyOTI2.Yw5WjjU3IuItPtqbegrIBJr3TSDMd_OPhQ2Nw-0-0ksg.8WgVjtB0fy0RCv0XhhUOOWt90Kz_394Zzb6xPjG6I8gg.PNG.lamute/user.png?type=w800",
      userStatus: "USER_EXIST",
      longitude: 127.044744776173,
      latitude: 37.3044825535735,
      userRole: "ROLE_OWNER",
    },
    storeImages: [
      {
        storeImage:
          "https://main055.s3.ap-northeast-2.amazonaws.com/user3-f6c47cfdce686ac947e4b22b65b021c81664264334291.jpeg",
      },
      {
        storeImage:
          "https://main055.s3.ap-northeast-2.amazonaws.com/user3-a48ec27b468b7c211a59f9de185df18f1664273215829.png",
      },
    ],
    reviews: [],
    heartUserId: [3],
  },
];

const dummyResponse = (page: number) => {
  return new Array(page * 16).fill(0).map((e, i) => {
    const data = { ...dummy[i % 3] };
    data.storeId = `${i}`;

    return data;
  });
};

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

const INITIAL_LOCATION = {
  address: "서울특별시 중구 세종대로 110",
  longitude: 126.97852781,
  latitude: 37.56660794,
};

const renderPlaceCards = (data: StoreList[]) => {
  return data.map(
    ({
      storeId,
      addressName,
      storeName,
      storeImages,
      reviews,
      heartUserId,
    }) => {
      const avgRating = Number(averageStar(reviews));
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
          key={storeId}
        />
      );
    }
  );
};

const Search = () => {
  const dispatch = useAppDispatch();
  const { nickname, longitude, latitude } =
    useAppSelector(selectUserInfos) || {};
  const [params] = useSearchParams();
  const [locPermission, setLocPermission] = useState(() => {
    if (!longitude && !nickname) return false;
    return true;
  });
  const keyword = params.get("search");
  const category = params.get("category") || "all";

  const bottom = useRef<HTMLDivElement>(null);

  const { data, isIdle } = useInfiniteQuery<SearchResponse>(
    ["search", keyword, category, longitude, latitude],
    async ({ pageParam = 1 }) => {
      const serverCategory =
        mappedCategories[category as keyof typeof mappedCategories];
      const { data } = await axiosInstance(
        `v1/store/search?keyword=${keyword}&category=${serverCategory}&page=${pageParam}&size=16&sort=${`distance`}&latitude=${latitude}&longitude=${longitude}`
      );

      return data.data;
    },
    {
      enabled: !!(longitude && latitude),
      retry: 2,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (!longitude || !latitude) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;

          dispatch(changeUserAddress({ latitude, longitude }));
          setLocPermission(true);
        },
        (err) => {
          dispatch(changeUserAddress(INITIAL_LOCATION));
          setLocPermission(false);
        },
        {
          maximumAge: 1 * 1000, // 1분
        }
      );
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [keyword]);

  if (!(category in mappedCategories)) {
    return <Navigate to="/not-found" />;
  }

  const results = data?.pages[0].data || dummyResponse(1);

  return (
    <SBox>
      <SHeader>
        <SearchBar />
        <SH1>{`‘${keyword}’에 대한 검색 결과입니다.`}</SH1>
        <SP showWarning={!locPermission}>
          위치 정보 권한을 허용해주세요.
          <SSpan>{`현재 위치: ${INITIAL_LOCATION.address}`}</SSpan>
        </SP>
        <Category
          menuList={searchCategories}
          baseQueryString={`?search=${keyword}`}
          extraQueryString="category"
        />
      </SHeader>

      <SUList>
        {results.length ? (
          renderPlaceCards(results)
        ) : (
          <div>검색 결과가 없습니다.</div>
        )}
      </SUList>
      <SBottomBox ref={bottom} />
    </SBox>
  );
};

export default Search;
