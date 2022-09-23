/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import styled from "styled-components";

import love from "../../../assets/images/mypage/love.png";
import user from "../../../assets/images/mypage/user.png";
import { recentPlace } from "./RecentDummyData";

const SContainer = styled.div`
  font-family: "ONE-Mobile-Regular";
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  padding: 20px 40px 20px 40px;
`;

const SItemContainer = styled.div`
  display: flex;
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

const SInfoContainer = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: auto;
`;

const SImageContainer = styled.div`
  margin: 10px;

  & > img {
    object-fit:cover
    justify-content: space-between;
    width: 100%;
    height: auto%;
    flex-direction: column;
  }
`;

const STextInfo = styled.div`
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const STitle = styled.div`
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
  const localstorageData = JSON.parse(
    localStorage.getItem("recentPlace") as string
  );
  console.log(localstorageData);
  return (
    <SContainer>
      <SHeader>
        <img sizes="24" alt="강아지아이콘" src={love} />
        <div>최근본동반장소</div>
      </SHeader>
      <SItemContainer>
        {localstorageData.map((place: any) => (
          <SInfoContainer key={place.storeId}>
            <SImageContainer>
              <img
                src={
                  place.storeImages.length >= 1
                    ? place.storeImages[0].storeImage
                    : user
                } // 기본 이미지 수정 예정
                alt="장소이미지"
                key={place.storeId}
              />
              <STextInfo>
                <STitle>{place.category}</STitle>
                <SArea>{place.adressName}</SArea>
                <SText>{place.storeName}</SText>
              </STextInfo>
            </SImageContainer>
          </SInfoContainer>
        ))}
      </SItemContainer>
    </SContainer>
  );
};

export default RecentList;
