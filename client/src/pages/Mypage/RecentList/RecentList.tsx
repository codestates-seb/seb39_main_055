/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

import { mobile } from "../../../assets";
import love from "../../../assets/icons/love.png";
import defaultImg from "../../../assets/images/mypage/defaultImg.jpg";
import NoImage from "./NoImage";

const SContainer = styled.div`
  font-family: "ONE-Mobile-Regular";
  display: flex;
  overflow-x: hidden;
  flex-direction: column;
  width: 100%;
  margin-bottom: 40px;
  cursor: pointer;

  height: auto;
  padding: 20px 40px 20px 40px;

  @media (max-width: 900px) {
    justify-content: center;
    height: auto;
    width: 500px;
  }

  ${mobile(css`
    justify-content: center;
    width: 100%;
    height: auto;
    padding: 40px 0px 0px 10px;
  `)}
`;

const SItemContainer = styled.div`
  width: 690px;
  display: flex;
  overflow-x: auto;

  ${mobile(css`
    width: 100%;
  `)}
`;

const SHeader = styled.div`
  display: flex;
  flex-direction: row;
  height: 10%;
  width: auto;
  padding-left: 10px;
  gap: 5px;
  margin-bottom: 15px;

  & > img {
    width: 24px;
    height: 24px;
  }
  & > div {
    font-size: 20px;
  }
`;

const SCardContainer = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: row;
  height: auto;
  ${mobile(css`
    width: 100%;
  `)}
`;

const SCard = styled.div`
  width: 220px;
  height: 315px;
  margin: 5px;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.black050};

  :hover {
    opacity: 0.6;
  }

  & > img {
    object-fit: cover;
    justify-content: space-between;
    width: 100%;
    height: 68%;
    flex-direction: column;
  }
  ${mobile(css`
    width: 380px;
    height: 90%;
  `)}
`;

const STextInfo = styled.div`
  padding-top: 10px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SCategory = styled.div`
  font-weight: bold;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.orange500};
  ${mobile(css`
    font-size: 20px;
    margin-bottom: 20px;
  `)}
`;

const SAddress = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.black400};
  ${mobile(css`
    font-size: 22px;
    margin-bottom: 8px;
  `)}
`;

const SStoreName = styled.div`
  font-size: 16px;
  line-height: 23px;
  ${mobile(css`
    font-size: 22px;
  `)}
`;

const RecentList = () => {
  const navigate = useNavigate();

  const cutStringLength = (str: string, maxLength: number) => {
    if (str === undefined || str === null) {
      return "";
    }
    if (str.length > maxLength) {
      str = `${str.substring(0, maxLength)}...`;
    }
    return str;
  };

  const getRecentList = window.localStorage.getItem("recentPlace");

  const localstorageData = getRecentList ? (
    JSON.parse(getRecentList)
  ) : (
    <NoImage
      title="최근 본 동반장소가 없습니다."
      body1="나의 반려동물들과 함께 다닐 수 있는"
      body2="다양한 펫 플레이스를 확인하세요!"
    />
  );
  return (
    <SContainer>
      <SHeader>
        <img sizes="24" alt="강아지아이콘" src={love} />
        <div>최근본동반장소</div>
      </SHeader>
      <SItemContainer>
        {localstorageData.length > 0
          ? localstorageData
              .slice(0)
              .reverse()
              .map((place: any) => {
                const [province, district] =
                  place.addressName.match(/(.*?)[시|구|군]/g)!;
                // 특별시, 광역시는 "구"까지 주소를 자름(ex. 서울시 중구, 대전시 대덕구)
                // 특별시, 광역시의 addressName은 OO시로 표현되므로 province 길이가 3 이하
                if (province.length <= 3) {
                  place.addressName = `${province}${district}`;
                }
                // 도 내의 일반 시, 군은 "시/군"까지 주소를 자름(ex. 경기 성남시, 강원 고성군)
                if (province.length > 3) {
                  place.addressName = province;
                }
                return (
                  <SCardContainer key={place.storeId}>
                    <SCard
                      onClick={() => {
                        navigate(`/place/${place.store.storeId}`);
                      }}
                    >
                      <img
                        src={
                          place.storeImages.length >= 1
                            ? place.storeImages[0].storeImage
                            : defaultImg
                        }
                        alt="장소이미지"
                        key={place.storeId}
                      />
                      <STextInfo>
                        <SCategory>{place.category}</SCategory>
                        <SAddress>{place.addressName}</SAddress>
                        <SStoreName>
                          {cutStringLength(place.storeName, 13)}
                        </SStoreName>
                      </STextInfo>
                    </SCard>
                  </SCardContainer>
                );
              })
          : localstorageData}
      </SItemContainer>
    </SContainer>
  );
};

export default RecentList;
