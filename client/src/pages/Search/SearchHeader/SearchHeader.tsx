/* eslint-disable react/display-name */
import { memo, ReactNode } from "react";

import { SearchBar } from "../../../components";
import { useGeolocation } from "../../../hooks";
import { INITIAL_LOCATION } from "../../../redux";
import { SSpan } from "../style";
import { SHeader, SP } from "./style";

interface SearchHeaderProps {
  resultHeader: ReactNode;
  category: ReactNode;
}

const SearchHeader = memo(({ resultHeader, category }: SearchHeaderProps) => {
  const [locPermission] = useGeolocation();

  return (
    <SHeader>
      <SearchBar />
      {resultHeader}
      <SP showWarning={!locPermission}>
        위치 정보를 기준으로 장소를 검색합니다.
        <SSpan>{`기본값: ${INITIAL_LOCATION.address}`}</SSpan>
      </SP>
      {category}
    </SHeader>
  );
});

export default SearchHeader;
