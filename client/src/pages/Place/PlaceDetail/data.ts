import { cafe, hospital, hotpension } from "../../../assets/images/hotplace";
import { Store } from "../../../types/store";

export const DUMMY_DATA: Store = {
  storeId: "4",
  createdAt: "2022-09-26T23:16:06",
  updatedAt: "2022-09-26T23:16:06",
  storeStatus: "STORE_EXIST",
  category: "카페",
  longitude: 127.044744776173,
  latitude: 37.3044825535735,
  storeName: "동작을 점령해버린 카페! 15호점",
  addressName: "서울시 동작구 흑석동 123-123",
  body: "강원도 동해시에 위치한 동해를 그리다 펜션입니다. 도보 5분 거리에 어달 해수욕장과 망상 해수욕장이 인접하여 있어 여름철 신나는 물놀이가 가능하며, 사계절 해변 산책이 가능합니다. 펜션 인근에서 낚시 배 체험이 가능하여 사랑하는 가족, 친구들과 함께 보다 즐거운 추억을 쌓으실 수 있습니다. 또한 전 객실 바베큐장 이용이 가능하며, 펜션 내 와이파이 사용이 가능합니다.",
  phone: "010-1234-1234",
  homepage: "http://동작을 점령해버린 병원.com",
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
    { storeImage: cafe },
    { storeImage: hospital },
    { storeImage: hotpension },
  ],
  reviews: {
    data: [
      {
        reviewId: "1",
        createdAt: "2022-09-26T23:32:02",
        updatedAt: "2022-09-26T23:32:02",
        reviewStatus: "REVIEW_EXIST",
        user: {
          nickname: "psy4인데요",
          email: "psy4@gmail.com",
          image:
            "https://mblogthumb-phinf.pstatic.net/MjAyMDA2MTBfMTY1/MDAxNTkxNzQ2ODcyOTI2.Yw5WjjU3IuItPtqbegrIBJr3TSDMd_OPhQ2Nw-0-0ksg.8WgVjtB0fy0RCv0XhhUOOWt90Kz_394Zzb6xPjG6I8gg.PNG.lamute/user.png?type=w800",
          userStatus: "USER_EXIST",
          longitude: 126.75036638,
          latitude: 37.50265438,
          userRole: "ROLE_OWNER",
        },
        storeId: "4",
        body: "이 동물병원 괜찮아요! 굿! 별점 4점 드립니다",
        score: 2,
      },
      {
        reviewId: "2",
        createdAt: "2022-09-26T23:32:02",
        updatedAt: "2022-09-26T23:32:02",
        reviewStatus: "REVIEW_EXIST",
        user: {
          nickname: "psy4인데요",
          email: "psy4@gmail.com",
          image:
            "https://mblogthumb-phinf.pstatic.net/MjAyMDA2MTBfMTY1/MDAxNTkxNzQ2ODcyOTI2.Yw5WjjU3IuItPtqbegrIBJr3TSDMd_OPhQ2Nw-0-0ksg.8WgVjtB0fy0RCv0XhhUOOWt90Kz_394Zzb6xPjG6I8gg.PNG.lamute/user.png?type=w800",
          userStatus: "USER_EXIST",
          longitude: 126.75036638,
          latitude: 37.50265438,
          userRole: "ROLE_OWNER",
        },
        storeId: "4",
        body: "이 동물병원 괜찮아요! 굿! 별점 4점 드립니다",
        score: 5,
      },
      {
        reviewId: "3",
        createdAt: "2022-09-26T23:32:02",
        updatedAt: "2022-09-26T23:32:02",
        reviewStatus: "REVIEW_EXIST",
        user: {
          nickname: "psy4인데요",
          email: "psy4@gmail.com",
          image:
            "https://mblogthumb-phinf.pstatic.net/MjAyMDA2MTBfMTY1/MDAxNTkxNzQ2ODcyOTI2.Yw5WjjU3IuItPtqbegrIBJr3TSDMd_OPhQ2Nw-0-0ksg.8WgVjtB0fy0RCv0XhhUOOWt90Kz_394Zzb6xPjG6I8gg.PNG.lamute/user.png?type=w800",
          userStatus: "USER_EXIST",
          longitude: 126.75036638,
          latitude: 37.50265438,
          userRole: "ROLE_OWNER",
        },
        storeId: "4",
        body: "이 동물병원 괜찮아요! 굿! 별점 4점 드립니다",
        score: 4,
      },
    ],
    pageInfo: {
      page: 1,
      size: 3,
      totalElements: 3,
      totalPages: 1,
    },
  },
  heartUserId: [3],
};
