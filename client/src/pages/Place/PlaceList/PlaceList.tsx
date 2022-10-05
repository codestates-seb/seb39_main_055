/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import {
  Banner,
  Category,
  PlaceCardList,
  PlaceCardListHeader,
} from "../../../components";
import { placeListCategories } from "../../../constants";
import { SBox, SH1 } from "./style";

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
    <SBox>
      <Banner />
      <PlaceCardListHeader
        title={<SH1>펫 플레이스</SH1>}
        category={
          <Category menuList={placeListCategories} selectedQKey="category" />
        }
        showSearchBar={false}
      />
      <PlaceCardList category={category} />
    </SBox>
  );
};

export default PlaceList;
