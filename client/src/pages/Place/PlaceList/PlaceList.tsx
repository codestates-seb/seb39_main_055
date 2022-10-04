/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import {
  Category,
  PlaceCardList,
  PlaceCardListHeader,
} from "../../../components";
import { placeListCategories } from "../../../constants";

const SH1 = styled.h1`
  font-size: 32px;
  margin: 60px 0px 40px 0px;
`;

const PlaceList = () => {
  const [params, setParams] = useSearchParams();

  const category = params.get("category") || "";

  // /place/list로만 접근했을 때 리다이렉트
  useEffect(() => {
    if (!category) {
      setParams({ category: "room" });
    }
  }, [category]);

  return (
    <div>
      <PlaceCardListHeader
        title={<SH1>펫 플레이스</SH1>}
        category={
          <Category menuList={placeListCategories} selectedQKey="category" />
        }
        showSearchBar={false}
      />
      <PlaceCardList category={category} />
    </div>
  );
};

export default PlaceList;
