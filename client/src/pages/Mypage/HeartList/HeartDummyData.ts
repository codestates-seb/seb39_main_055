import styled, { css } from "styled-components";

import pension from "../../../assets/images/mypage/pension.jpg";

interface Props {
  storeId: number;
  image: string;
  category: string;
  storeName: string;
  addressName: string;
  storeImages: { storeImage: string }[];
}

export const heartDummyData = [
  {
    store: {
      storeId: 5,
      category: "카페",
      storeName: "동작을 점령해버린 카페! 2호점",
      addressName: "서울시 동작구 흑석동 123-123",
    },
    storeImages: [
      {
        storeImage:
          "https://main055.s3.ap-northeast-2.amazonaws.com/user1-nurung1663583751271.png",
      },
      {
        storeImage:
          "https://main055.s3.ap-northeast-2.amazonaws.com/user1-%EB%94%B8%EA%B8%B01663583750534.png",
      },
    ],
  },
  {
    store: {
      storeId: 5,
      category: "카페",
      storeName: "동작을 점령해버린 카페! 2호점",
      addressName: "서울시 동작구 흑석동 123-123",
    },
    storeImages: [
      {
        storeImage:
          "https://main055.s3.ap-northeast-2.amazonaws.com/user1-nurung1663583751271.png",
      },
      {
        storeImage:
          "https://main055.s3.ap-northeast-2.amazonaws.com/user1-%EB%94%B8%EA%B8%B01663583750534.png",
      },
    ],
  },
  {
    store: {
      storeId: 5,
      category: "카페",
      storeName: "동작을 점령해버린 카페! 2호점",
      addressName: "서울시 동작구 흑석동 123-123",
    },
    storeImages: [
      {
        storeImage:
          "https://main055.s3.ap-northeast-2.amazonaws.com/user1-nurung1663583751271.png",
      },
      {
        storeImage:
          "https://main055.s3.ap-northeast-2.amazonaws.com/user1-%EB%94%B8%EA%B8%B01663583750534.png",
      },
    ],
  },
  {
    store: {
      storeId: 5,
      category: "카페",
      storeName: "동작을 점령해버린 카페! 2호점",
      addressName: "서울시 동작구 흑석동 123-123",
    },
    storeImages: [
      {
        storeImage:
          "https://main055.s3.ap-northeast-2.amazonaws.com/user1-nurung1663583751271.png",
      },
      {
        storeImage:
          "https://main055.s3.ap-northeast-2.amazonaws.com/user1-%EB%94%B8%EA%B8%B01663583750534.png",
      },
    ],
  },
];
