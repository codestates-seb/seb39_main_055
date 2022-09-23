import { PlaceholderDataFunction } from "react-query";
import styled, { css } from "styled-components";

import pension from "../../../assets/images/mypage/pension.jpeg";
import pension2 from "../../../assets/images/mypage/pension2.png";
import pension3 from "../../../assets/images/mypage/pension3.png";
import pension4 from "../../../assets/images/mypage/pension4.png";
import pension5 from "../../../assets/images/mypage/pension5.png";

interface Props {
  place: {
    storeId: string;
    category: string;
    storeName: string;
    adressName: string;
    storeImages: { storeImage: string }[];
  };
}
export const recentPlace = [
  {
    storeId: "1",
    category: "카페",
    storeName: "동작 카페 3호점",
    adressName: "서울시 동작구",
    storeImages: [
      {
        storeImage: pension,
      },
    ],
  },
  {
    storeId: "2",
    category: "숙소",
    storeName: "동작 카페 3호점",
    addressName: "서울시 동작구",
    storeImages: [
      {
        storeImage: pension2,
      },
    ],
  },
  {
    storeId: "3",
    category: "카페",
    storeName: "동작 카페 3호점",
    addressName: "서울시 동작구",
    storeImages: [],
  },
  {
    storeId: "4",
    category: "숙소",
    storeName: "동작 카페 3호점",
    addressName: "서울시 동작구",
    storeImages: [
      {
        storeImage: pension4,
      },
    ],
  },
  {
    storeId: "5",
    category: "카페",
    storeName: "동작 카페 3호점",
    addressName: "서울시 동작구",
    storeImages: [
      {
        storeImage: pension5,
      },
    ],
  },
  {
    storeId: "6",
    category: "숙소",
    storeName: "동작 카페 3호점",
    addressName: "서울시 동작구",
    storeImages: [
      {
        storeImage: pension,
      },
    ],
  },
  {
    storeId: "7",
    category: "카페",
    storeName: "동작 카페 3호점",
    addressName: "서울시 동작구",
    storeImages: [
      {
        storeImage: pension2,
      },
    ],
  },
  {
    storeId: "8",
    category: "숙소",
    storeName: "동작 카페 3호점",
    addressName: "서울시 동작구",
    storeImages: [
      {
        storeImage: pension3,
      },
    ],
  },
];
