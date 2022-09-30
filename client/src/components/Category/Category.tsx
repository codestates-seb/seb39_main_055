/* eslint-disable react/display-name */
import { memo } from "react";
import { useSearchParams } from "react-router-dom";

import MenuIcon from "./MenuIcon";
import { SCategoryMenu } from "./style";

interface CategoryList {
  img: string;
  alt: string;
  menuText: string;
  baseLink?: string;
  queryKey?: string; // 카테고리를 구분하는 쿼리 스트링 키(key)
  queryValue?: string; // 카테고리를 구분하는 쿼리 스트링 값(value)
  selected?: boolean;
}

interface CategoryProps {
  menuList: CategoryList[];
  queryStrings?: { key: string; value: string }[];
  selectedQKey?: string;
}

function combineQueryStrings(
  fullQString = "",
  baseLink = "",
  queryKey = "",
  queryValue = ""
) {
  let seperator = "";
  // 바로 앞에 붙는 공통 쿼리 스트링은 없지만 개별 카테고리의 쿼리 스트링이 있을 때 (ex. ?category=cafe)
  if (!fullQString && queryKey) {
    seperator = "?";
  }
  // 바로 앞에 붙는 공통 쿼리 스트링과 개별 카테고리의 쿼리 스트링이 있을 때 (ex. ?search=서울&category=cafe)
  if (fullQString && queryKey) {
    seperator = "&";
  }

  const lastQString = queryKey ? `${queryKey}=${queryValue}` : "";

  return `${baseLink}${fullQString}${seperator}${lastQString}`;
}

/**
 * @param menuList
 * @param queryStrings 모든 카테고리에서 공통적으로 사용되는 쿼리 스트링 키, 값. (ex. {key: "search", value: "서울" })
 * @param selectedQKey 카테고리를 구분하는 데 사용되는 쿼리 스트링 키
 */
const Category = memo(
  ({ menuList, queryStrings = [], selectedQKey }: CategoryProps) => {
    const [params] = useSearchParams();
    const fullQString = queryStrings.reduce((link, { key, value }, i) => {
      if (i < 1) return `?${key}=${value}`;

      return `${link}&${key}=${value}`;
    }, "");

    return (
      <SCategoryMenu>
        {menuList.map(
          ({ menuText, baseLink, queryKey, queryValue, img, alt }) => {
            const pathTo = combineQueryStrings(
              fullQString,
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
