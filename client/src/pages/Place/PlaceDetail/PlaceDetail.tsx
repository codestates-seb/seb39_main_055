import { AiFillStar } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";
import { HiOutlineHeart } from "react-icons/hi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";

import { cafe, hospital, hotpension } from "../../../assets/images/hotplace";
import { Slider } from "../../../components";
import { DUMMY_DATA } from "./data";

export const SContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1130px) {
    padding: 20px;
  }
`;

export const SImagesContainer = styled.section`
  height: 600px;
  margin-top: 80px;
`;

export const SHeader = styled.header`
  padding: 35px 0;
  border-bottom: 1px solid #dbdbdb;

  & > p {
    color: #434343;
    font-size: 26px;
    margin-bottom: 10px;
  }
`;

export const STitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;

  & > h1 {
    color: #161616;
    font-size: 36px;

    &:after {
      content: "";
      display: block;
      width: 32px;
      border-bottom: 3px solid #161616;
      margin-top: 8px;
    }
  }

  & > svg {
    color: #ffc107;
    fill: #ffc107;
    font-size: 32px;
    cursor: pointer;
  }
`;

export const SScoreContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  & > svg {
    margin-right: 6px;
    font-size: 26px;
    color: #ffc107;
    fill: #ffc107;
  }

  & > span {
    margin-right: 20px;
    color: #707070;
    font-size: 18px;
  }

  & > div {
    display: flex;
    align-items: center;
    color: #ffa000;
    fill: #ffa000;
    font-size: 18px;
    cursor: pointer;

    & > svg {
      font-size: 24px;
    }
  }
`;

export const SLocationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  color: #707070;
  font-size: 18px;

  & > div:first-child {
    display: flex;
    align-items: center;
    gap: 10px;

    & > svg {
      fill: #707070;
      font-size: 30px;
    }

    & > span {
      vertical-align: middle;
    }
  }

  & > div:last-child {
    display: flex;
    align-items: center;
    gap: 10px;

    & > button {
      width: 60px;
      height: 28px;
      color: #161616;
      background-color: inherit;
      border: 1px solid #161616;
      border-radius: 20px;
      font-size: 16px;
      transition: all 0.4s;

      &:hover {
        background-color: #ffc107;
        border-color: #ffc107;
      }
    }
  }

  /* @media screen and (max-width: ${({ theme }) => theme.breakPoints.tablet}) {
    flex-direction: column;
  } */
`;

export const SDescriptionContainer = styled.div`
  border-bottom: 1px solid #dbdbdb;
  padding: 35px 0;
`;

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

export const SReviewContainer = styled.section`
  padding: 35px 0;
`;
const PlaceDetail = () => {
  const data = DUMMY_DATA;
  const convertImages = DUMMY_DATA.storeImages.map((image) => image.storeImage);
  return (
    <SContainer>
      <main>
        <SImagesContainer>
          <Slider imageList={convertImages} />
        </SImagesContainer>
        <SHeader>
          <STitle>
            <h1>도그 더왈츠 애견펜션</h1>
            <HiOutlineHeart />
          </STitle>
          <p>제주 서귀포시</p>
          <SScoreContainer>
            <AiFillStar />
            <span>4.5</span>
            <div>
              <span>리뷰보기</span>
              <MdOutlineKeyboardArrowRight />
            </div>
          </SScoreContainer>
          <SLocationContainer>
            <div>
              <FaMapMarkerAlt />
              <span>경기 가평군 북면 가화로 1462-39</span>
            </div>
            <div>
              <button type="button">수정</button>
              <button type="button">삭제</button>
            </div>
          </SLocationContainer>
        </SHeader>
        <SDescriptionContainer>
          <SH2>시설 개요</SH2>
          <SP>
            강원도 동해시에 위치한 동해를 그리다 펜션입니다. 도보 5분 거리에
            어달 해수욕장과 망상 해수욕장이 인접하여 있어 여름철 신나는 물놀이가
            가능하며, 사계절 해변 산책이 가능합니다. 펜션 인근에서 낚시 배
            체험이 가능하여 사랑하는 가족, 친구들과 함께 보다 즐거운 추억을
            쌓으실 수 있습니다. 또한 전 객실 바베큐장 이용이 가능하며, 펜션 내
            와이파이 사용이 가능합니다.
          </SP>
        </SDescriptionContainer>
        <SInfoContainer>
          <SH2>기본 정보</SH2>
          <div>
            <span>전화</span>
            <span>010-7138-0994</span>
          </div>
          <div>
            <span>홈페이지</span>
            <span>http://test.com</span>
          </div>
          <div>
            <span>주소</span>
            <span>경기 가평군 북면 가화로 1462-39</span>
          </div>
          <Map
            center={{ lat: 33.5563, lng: 126.79581 }}
            style={{ width: "100%", height: "400px", marginTop: "40px" }}
          >
            <MapMarker position={{ lat: 33.55635, lng: 126.795841 }} />
          </Map>
        </SInfoContainer>
      </main>
      <section>리뷰</section>
    </SContainer>
  );
};

export default PlaceDetail;
