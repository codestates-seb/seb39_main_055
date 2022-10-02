/* eslint-disable consistent-return */
import { Navigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Category, PlaceCardList, PlaceCardListHeader } from "../../components";
import { mappedCategories, searchCategories } from "../../constants";
import { axiosInstance } from "../../utils";
import { SBox, SH1 } from "./style";

interface ExtraArgs {
  keyword: string;
  size: number;
  sort: string;
  latitude: number;
  longitude: number;
}

const searchPlaces = async (
  pageParam: number,
  category: string,
  extraArgs: ExtraArgs
) => {
  if (!(category in mappedCategories)) return;

  const { keyword, size, sort, latitude, longitude } = extraArgs;

  // 카테고리: 클라이언트의 category 쿼리 스트링과 서버 API 요청 URL이 다른 부분 맞춰줌
  const serverCategory =
    mappedCategories[category as keyof typeof mappedCategories];
  const { data } = await axiosInstance(
    `v1/store/search?keyword=${keyword}&category=${serverCategory}&page=${pageParam}&size=${size}&sort=${`distance`}&latitude=${latitude}&longitude=${longitude}`
  );

  return data;
};

const Search = () => {
  const [params] = useSearchParams();

  const keyword = params.get("search");
  const category = params.get("category") || "all";

  if (keyword === null) {
    toast.error("유효하지 않은 접근입니다.");

    return <Navigate to="/" />;
  }

  // 유저가 존재하지 않는 카테고리로 주소를 변경하면 NotFound 페이지로 이동
  if (!(category in mappedCategories)) {
    return <Navigate to="/not-found" />;
  }

  return (
    <SBox>
      <PlaceCardListHeader
        title={<SH1>{`‘${keyword}’에 대한 검색 결과입니다.`}</SH1>}
        category={
          <Category
            menuList={searchCategories}
            queryStrings={[{ key: "search", value: keyword }]}
            selectedQKey="category"
          />
        }
      />
      <PlaceCardList keyword={keyword} category={category} />
    </SBox>
  );
};

export default Search;
