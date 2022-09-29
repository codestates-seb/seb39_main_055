/* eslint-disable react/display-name */
import { memo, ReactNode } from "react";

import { SearchBar } from "../../../components";
import { useGeolocation } from "../../../hooks";
import { INITIAL_LOCATION } from "../../../redux";
import { SaBox, SaP, SbP, SHeader, SLocSVG, SWarningBox } from "./style";

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
      <SWarningBox showWarning={!locPermission}>
        <SaBox>
          <SLocSVG />
          <SaP>
            펫플레이스 검색에 위치 정보를 사용합니다. 위치 정보 권한을
            확인해주세요.
          </SaP>
        </SaBox>

        <SbP>{`검색 기준 위치: ${INITIAL_LOCATION.address}`}</SbP>
      </SWarningBox>

      {category}
    </SHeader>
  );
});

export default SearchHeader;
