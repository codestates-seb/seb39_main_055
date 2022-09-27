import { AiFillStar } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";
import { HiOutlineHeart } from "react-icons/hi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import styled from "styled-components";

import { cafe, hospital, hotpension } from "../../../assets/images/hotplace";
import { Slider } from "../../../components";

export const SImagesContainer = styled.section`
  height: 522px;
  margin-top: 80px;
  margin-bottom: 35px;
`;

export const SHeader = styled.header`
  padding-bottom: 35px;
  border-bottom: 1px solid #dbdbdb;

  & > p {
    color: #434343;
    font-size: 32px;
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
    font-size: 42px;

    &:after {
      content: "";
      display: block;
      width: 40px;
      border-bottom: 3px solid #161616;
      margin-top: 13px;
    }
  }

  & > svg {
    color: #ffc107;
    fill: #ffc107;
    font-size: 38px;
    cursor: pointer;
  }
`;

export const SScoreContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  & > svg {
    margin-right: 10px;
    font-size: 36px;
    color: #ffc107;
    fill: #ffc107;
  }

  & > span {
    margin-right: 20px;
    color: #707070;
    font-size: 24px;
  }

  & > div {
    display: flex;
    align-items: center;
    color: #ffa000;
    fill: #ffa000;
    font-size: 24px;
    cursor: pointer;

    & > svg {
      font-size: 30px;
    }
  }
`;

export const SLocationContainer = styled.div`
  display: felx;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  color: #707070;
  font-size: 24px;

  & > div:first-child {
    display: flex;
    align-items: center;
    gap: 10px;

    & > svg {
      fill: #707070;
      font-size: 36px;
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
      transition: all 0.4s;

      &:hover {
        background-color: #ffc107;
        border-color: #ffc107;
      }
    }
  }
`;

export const SH2 = styled.h2`
  color: #000000;
  font-size: 32px;
  margin: 35px 0 25px 0;
`;

export const SP = styled.p`
  color: #434343;
  font-size: 24px;
  line-height: 40px;
`;

const PlaceDetail = () => {
  return (
    <>
      <main>
        <SImagesContainer>
          <Slider
            imageList={[
              { image: cafe },
              { image: hospital },
              { image: hotpension },
            ]}
          />
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
        <SH2>숙소정보</SH2>
        <SP>
          강원도 동해시에 위치한 동해를 그리다 펜션입니다. 도보 5분 거리에 어달
          해수욕장과 망상 해수욕장이 인접하여 있어 여름철 신나는 물놀이가
          가능하며, 사계절 해변 산책이 가능합니다. 펜션 인근에서 낚시 배 체험이
          가능하여 사랑하는 가족, 친구들과 함께 보다 즐거운 추억을 쌓으실 수
          있습니다. 또한 전 객실 바베큐장 이용이 가능하며, 펜션 내 와이파이
          사용이 가능합니다.
        </SP>
      </main>
      {/* <section>리뷰</section> */}
    </>
  );
};

export default PlaceDetail;
