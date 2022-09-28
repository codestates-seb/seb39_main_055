/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import styled, { css } from "styled-components";

import { mobile, tablet } from "../../../assets";
import love from "../../../assets/icons/love.png";
import defaultImg from "../../../assets/images/mypage/defaultImg.jpg";
import { EmptyList, recentPlace } from "./RecentDummyData";

const SContainer = styled.div`
  font-family: "ONE-Mobile-Regular";
  display: flex;
  overflow-x: hidden;
  flex-direction: column;
  width: 100%;

  height: auto;
  padding: 20px 40px 20px 40px;

  @media (max-width: 900px) {
    justify-content: center;
    height: auto;
    width: 500px;
  }

  ${mobile(css`
    justify-content: center;
    width: 260px;
    height: auto;
    padding: 40px 0px 0px 25px;
  `)}
`;

const SItemContainer = styled.div`
  width: 690px;
  display: flex;
  overflow-x: scroll;
`;

const SHeader = styled.div`
  display: flex;
  flex-direction: row;
  height: 10%;
  width: auto;
  padding-left: 10px;
  gap: 5px;

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
  width: 100%;
  height: auto;
`;

const SCard = styled.div`
  width: 220px;
  height: 315px;
  margin: 5px;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.black050};

  & > img {
    object-fit: cover;
    justify-content: space-between;
    width: 100%;
    height: 68%;
    flex-direction: column;
  }
`;

const STextInfo = styled.div`
  padding-top: 10px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const STitle = styled.div`
  font-weight: bold;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.orange500};
`;

const SArea = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.black400};
`;

const SText = styled.div`
  font-size: 16px;
  line-height: 23px;
`;

const RecentList = () => {
  const getRecentList = window.localStorage.getItem("recentPlace");

  const localstorageData = getRecentList ? (
    JSON.parse(getRecentList)
  ) : (
    <div>최근 본 목록이 없습니다.</div>
  );

  console.log(localstorageData);
  return (
    <SContainer>
      <SHeader>
        <img sizes="24" alt="강아지아이콘" src={love} />
        <div>최근본동반장소</div>
      </SHeader>
      <SItemContainer>
        {localstorageData.length > 0
          ? localstorageData.map((place: any) => (
              <SCardContainer key={place.storeId}>
                <SCard>
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
                    <STitle>{place.category}</STitle>
                    <SArea>{place.addressName}</SArea>
                    <SText>{place.storeName}</SText>
                  </STextInfo>
                </SCard>
              </SCardContainer>
            ))
          : localstorageData}
      </SItemContainer>
    </SContainer>
  );
};

export default RecentList;
