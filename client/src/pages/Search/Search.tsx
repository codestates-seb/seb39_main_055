import { Navigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Category, PlaceList } from "../../components";
import { mappedCategories, searchCategories } from "../../constants";
import SearchHeader from "./SearchHeader/SearchHeader";
import { SBox, SH1 } from "./style";

const Search = () => {
  const [params] = useSearchParams();

  const keyword = params.get("search");
  const category = params.get("category") || "all";

  if (keyword === null) {
    toast.error("유효하지 않은 접근입니다.");
    return <Navigate to="/not-found" />;
  }

  // 유저가 존재하지 않는 카테고리로 주소를 변경하면 NotFound 페이지로 이동
  if (!(category in mappedCategories)) {
    return <Navigate to="/not-found" />;
  }

  return (
    <SBox>
      <SearchHeader
        resultHeader={<SH1>{`‘${keyword}’에 대한 검색 결과입니다.`}</SH1>}
        category={
          <Category
            menuList={searchCategories}
            baseQueryString={`?search=${keyword}`}
            extraQueryString="category"
          />
        }
      />
      <PlaceList keyword={keyword} category={category} />
    </SBox>
  );
};

export default Search;
