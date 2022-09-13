import R1 from "../../../assets/images/main-review/r1.png";
import U1 from "../../../assets/images/main-review/u1.png";
import ReviewCard from "./ReviewCard/ReviewCard";
import {
  SCardBox,
  SCardSection,
  SH1,
  SH2,
  SHgroup,
  SReviewSection,
} from "./style";

const Reviews = [
  {
    reviewImg: R1,
    loc: "서울 강남구",
    place: "멍박스24 무인애견셀프목욕 및 무인카페",
    review:
      "적은 기계소음으로 강아지들의 스트레스를 줄이고 털말리는 꿀팁도 얻어가세요",
    rating: "4.8",
    reviewer: "두부한모",
    userImg: U1,
  },
  {
    reviewImg: R1,
    loc: "충남 천안시",
    place: "파고다 포레스트",
    review:
      "따로 강아지 동반 자리로 분리되어있어 너무 편했어요! 사장님도 친절하시구 강아지 물도 따로 챙겨주셨어요!! 음식도 맛있고 가격도 괜찮았어요! 천안 방문시 한번 가보세요 추천해요!",
    rating: "4.6",
    reviewer: "LEEYR",
    userImg: U1,
  },
  {
    reviewImg: R1,
    loc: "경기 양주시",
    place: "장흥 자생 수목원",
    review:
      "산림욕하기에도 너무 좋고 중간 중간 쉴곳도 많아서 천천히 즐기기에 너무 좋았어요",
    rating: "4.2",
    reviewer: "마루",
    userImg: U1,
  },
  {
    reviewImg: R1,
    loc: "경기 가평군",
    place: "가평 글램독 애견펜션",
    review:
      "너무 좋았어요~~ 주인분들도 완전 친절하시고 문열면 강아지들이 바로 나가서 뛰어놀 수 있어요. 각 구역마다 울타리 문이 설치되어 있어서 원하는대로 애들 동선도 파악가능해서 너무 좋았어요! 다음에도 휴가철에 갈거에요!",
    rating: "45.0",
    reviewer: "IH Jang",
    userImg: U1,
  },
  {
    reviewImg: R1,
    loc: "충북 음성군",
    place: "현대동물병원",
    review:
      "믿고 다닐 수 있는 동물병원입니다! 우리집 애기가 아플 때 진료비 바가지 없고 보호자 앞에서 큰 수술 빼고는 다해주셔서 정말 믿을 수 있습니다!! 가기전 예약은 필수에요!",
    rating: "4.6",
    reviewer: "CKI",
    userImg: U1,
  },
  {
    reviewImg: R1,
    loc: "인천 서구",
    place: "서원안길",
    review:
      "사장님께서 너무 친절하시고 음료도 너무 맛있어요! 강아지 메뉴도 따로 준비되어 있어서 더욱 좋았습니다. 카페 자체 메뉴도, 전경도 좋아서 재방문할 것 같아요!",
    rating: "3.8",
    reviewer: "QUAN YIHUA",
    userImg: U1,
  },
];

const Review = () => {
  return (
    <SReviewSection>
      <SHgroup>
        <SH1>제가 가봤는데요!</SH1>
        <SH2>직접 경험한 사람들의 생생한 경험담을 확인해보세요.</SH2>
      </SHgroup>
      <SCardSection>
        <SCardBox>
          {Reviews.map((e) => (
            <ReviewCard
              reviewImg={e.reviewImg}
              loc={e.loc}
              place={e.place}
              review={e.review}
              rating={e.rating}
              reviewer={e.reviewer}
              userImg={e.userImg}
              key={e.place}
            />
          ))}
        </SCardBox>
      </SCardSection>
    </SReviewSection>
  );
};

export default Review;
