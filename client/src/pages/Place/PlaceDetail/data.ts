import { cafe, hospital, hotpension } from "../../../assets/images/hotplace";
import { Store } from "../../../types/store";

export const DUMMY_DATA: Store = {
  storeId: "4",
  createdAt: "2022-09-26T23:16:06",
  updatedAt: "2022-09-26T23:16:06",
  storeStatus: "STORE_EXIST",
  category: "카페",
  longitude: "70.0",
  latitude: "80.0",
  storeName: "동작을 점령해버린 카페! 15호점",
  addressName: "서울시 동작구 흑석동 123-123",
  body: "진료 전 메뉴 500원",
  phone: "010-1234-1234",
  homepage: "http://동작을 점령해버린 병원.com",
  user: {
    nickname: "psy001",
    email: "psy1@gmail.com",
    image:
      "https://main055.s3.ap-northeast-2.amazonaws.com/user2-e4ebbe042cfb2c8dbdfbb72ee3c764f11664189442402.jpeg",
    userStatus: "USER_EXIST",
    longitude: "127.074928451599",
    latitude: "37.6322400488783",
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
          longitude: "126.75036638",
          latitude: "37.50265438",
          userRole: "ROLE_OWNER",
        },
        storeId: "4",
        body: "이 동물병원 괜찮아요! 굿! 별점 4점 드립니다",
        score: 4,
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
          longitude: "126.75036638",
          latitude: "37.50265438",
          userRole: "ROLE_OWNER",
        },
        storeId: "4",
        body: "이 동물병원 괜찮아요! 굿! 별점 4점 드립니다",
        score: 4,
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
          longitude: "126.75036638",
          latitude: "37.50265438",
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
  // heartUserId: []
};
