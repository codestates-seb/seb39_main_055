import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";

import { Store } from "../../../../types";

export const SH2 = styled.h2`
  color: #000000;
  font-size: 26px;
  margin-bottom: 25px;
`;

export const SP = styled.p`
  color: #434343;
  font-size: 18px;
  line-height: 40px;
`;

export const SInfoContainer = styled.div`
  padding: 35px 0;
  border-bottom: 1px solid #dbdbdb;

  & > div {
    display: flex;
    margin-bottom: 15px;

    & > span:first-child {
      flex-basis: 15%;
      color: #161616;
      font-size: 18px;
    }

    & > span:last-child {
      color: #434343;
      font-size: 18px;
    }
  }
`;

interface Prop {
  data: Store;
}

const Info = ({ data }: Prop) => {
  return (
    <SInfoContainer>
      <SH2>기본 정보</SH2>
      <div>
        <span>전화</span>
        <span>{data.phone}</span>
      </div>
      <div>
        <span>홈페이지</span>
        <span>{data.homepage}</span>
      </div>
      <div>
        <span>주소</span>
        <span>{data.addressName}</span>
      </div>
      <Map
        center={{ lat: data.latitude, lng: data.longitude }}
        style={{ width: "100%", height: "400px", marginTop: "40px" }}
      >
        <MapMarker position={{ lat: data.latitude, lng: data.longitude }} />
      </Map>
    </SInfoContainer>
  );
};

export default Info;
