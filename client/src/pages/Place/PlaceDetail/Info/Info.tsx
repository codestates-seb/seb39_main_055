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

    & > a {
      color: #434343;
      font-size: 18px;
    }

    @media screen and (max-width: ${({ theme }) => theme.breakPoints.tablet}) {
      flex-direction: column;
      margin-bottom: 25px;

      & > span:first-child {
        margin-bottom: 10px;
      }
    }
  }
`;

interface Prop {
  data: Store | undefined;
}

const Info = ({ data }: Prop) => {
  return (
    <SInfoContainer>
      <SH2>기본 정보</SH2>
      <div>
        <span>전화</span>
        <a href={`tel:${data?.phone}`}>{data?.phone}</a>
      </div>
      <div>
        <span>홈페이지</span>
        <a href={data?.homepage} target="_blank" rel="noreferrer">
          {data?.homepage}
        </a>
      </div>
      <div>
        <span>주소</span>
        <span>{data?.addressName}</span>
      </div>
      <Map
        center={{
          lat: data?.latitude as number,
          lng: data?.longitude as number,
        }}
        style={{ width: "100%", height: "400px", marginTop: "40px" }}
      >
        <MapMarker
          position={{
            lat: data?.latitude as number,
            lng: data?.longitude as number,
          }}
        />
      </Map>
    </SInfoContainer>
  );
};

export default Info;
