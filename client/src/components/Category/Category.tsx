/* eslint-disable react/display-name */
import { memo } from "react";
import { useSearchParams } from "react-router-dom";

import MenuIcon from "./MenuIcon";
import { SCategoryMenu } from "./style";

// "/place/list?category=room"으로 연결되는 카테고리일 때
export interface CategoryList {
  img: string;
  alt: string;
  menuText: string;
  baseLink?: string; // 쿼리 스트링 이전의 경로(ex. /place/list)
  queryKey?: string; // 카테고리를 구분하는 쿼리 스트링 키(ex. category)
  queryValue?: string; // 카테고리를 구분하는 쿼리 스트링 값(ex. room)
  selected?: boolean;
}

interface CategoryProps {
  menuList: CategoryList[];
  queryStrings?: { key: string; value: string }[];
  selectedQKey?: string;
}

function combineQueryStrings(
  commonQueryString = "",
  baseLink = "",
  queryKey = "",
  queryValue = ""
) {
  let seperator = "";
  // 바로 앞에 붙는 공통 쿼리 스트링은 없지만 개별 카테고리의 쿼리 스트링이 있을 때 (ex. ?category=cafe)
  if (!commonQueryString && queryKey) {
    seperator = "?";
  }
  // 바로 앞에 붙는 공통 쿼리 스트링과 개별 카테고리의 쿼리 스트링이 있을 때 (ex. ?search=서울&category=cafe)
  if (commonQueryString && queryKey) {
    seperator = "&";
  }

  const lastQString = queryKey ? `${queryKey}=${queryValue}` : "";

  return `${baseLink}${commonQueryString}${seperator}${lastQString}`;
}

/**
 * @param menuList
 * @param queryStrings 모든 카테고리에서 "공통적"으로 사용되는 쿼리 스트링 키와 값. (ex. { key: "search", value: "서울" })
 * 메뉴마다 다른 쿼리 스트링이 사용될 경우 menuList 배열의 queryKey, queryValue 속성으로 지정해야 함
 * @param selectedQKey 현재 페이지인 카테고리를 구분하는 데 사용되는 쿼리 스트링 키
 */
const Category = memo(
  ({ menuList, queryStrings = [], selectedQKey }: CategoryProps) => {
    const [params] = useSearchParams();
    const commonQueryString = queryStrings.reduce((link, { key, value }, i) => {
      if (i < 1) return `?${key}=${value}`;

      return `${link}&${key}=${value}`;
    }, "");

    return (
      <SCategoryMenu>
        {menuList.map(
          ({ menuText, baseLink, queryKey, queryValue, img, alt }) => {
            const pathTo = combineQueryStrings(
              commonQueryString,
              baseLink,
              queryKey,
              queryValue
            );

            return (
              <MenuIcon
                menuText={menuText}
                link={pathTo}
                img={img}
                selected={params.get(selectedQKey || "") === queryValue}
                alt={alt}
                key={menuText}
              />
            );
          }
        )}
      </SCategoryMenu>
    );
  }
);

export default Category;
