/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

import { getHeartList } from "../../../apis/user/heartList";
import { mobile } from "../../../assets";
import like from "../../../assets/icons/like.png";
import likeRed from "../../../assets/icons/likeRed.png";
import defaultImg from "../../../assets/images/mypage/defaultImg.jpg";
import { LoadingSpinner } from "../../../components";
import { useAppSelector } from "../../../redux";
import NoImage from "../RecentList/NoImage";

const SContainer = styled.div`
  font-family: "ONE-Mobile-Regular";
  display: flex;
  overflow-x: hidden;
  flex-direction: column;
  width: 100%;
  margin-bottom: 40px;
  cursor: pointer;

  height: auto;
  padding: 80px 40px 20px 40px;

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
  overflow-x: hidden;

  :hover {
    opacity: 0.6;
  }
  ${mobile(css`
    width: 380px;
    height: 90%;
  `)}
`;

const CardImage = styled.div`
  position: relative;
  width: 100%;
  height: 68%;

  & > img {
    object-fit: cover;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    flex-direction: column;
  }
`;

const STextInfo = styled.div`
  padding-top: 10px;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const STitle = styled.div`
  font-weight: bold;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.orange500};
  ${mobile(css`
    font-size: 20px;
    margin-bottom: 20px;
  `)}
`;

const SArea = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.black400};
  ${mobile(css`
    font-size: 22px;
    margin-bottom: 8px;
  `)}
`;

const SText = styled.div`
  font-size: 16px;
  line-height: 23px;
  color: ${({ theme }) => theme.colors.black500};
  ${mobile(css`
    font-size: 22px;
  `)}
`;

const SRedLikeIcon = styled.span`
  position: absolute;
  top: 57%;
  right: 7%;
`;

const SLoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 33%;
  ${mobile(css`
    margin-top: 50px;
  `)}
`;

const HeartList = () => {
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

  const { userInfos } = useAppSelector((state) => state.user);
  const { data, isLoading } = useQuery(
    ["heart", userInfos?.userId],
    getHeartList,
    { retry: false, cacheTime: 0 }
  );
  if (isLoading) {
    return (
      <SLoadingContainer>
        <LoadingSpinner />
      </SLoadingContainer>
    );
  }
  return (
    <SContainer>
      <SHeader>
        <img sizes="24" alt="하트아이콘" src={like} />
        <div>찜</div>
      </SHeader>
      <SItemContainer>
        {(data?.length as number) > 0 ? (
          data?.map((heart) => {
            const [province, district] =
              heart.store.addressName.match(/(.*?)[시|구|군]/g)!;
            // 특별시, 광역시는 "구"까지 주소를 자름(ex. 서울시 중구, 대전시 대덕구)
            // 특별시, 광역시의 addressName은 OO시로 표현되므로 province 길이가 3 이하
            if (province.length <= 3) {
              heart.store.addressName = `${province}${district}`;
            }
            // 도 내의 일반 시, 군은 "시/군"까지 주소를 자름(ex. 경기 성남시, 강원 고성군)
            if (province.length > 3) {
              heart.store.addressName = province;
            }
            return (
              <SCardContainer key={heart.store.storeId}>
                <SCard
                  onClick={() => {
                    navigate(`/place/${heart.store.storeId}`);
                  }}
                >
                  <CardImage>
                    <img
                      src={
                        heart.store.storeImages.length >= 1
                          ? heart.store.storeImages[0].storeImage
                          : defaultImg
                      }
                      alt={heart.store.storeId}
                    />
                    <SRedLikeIcon>
                      <img alt="빨간하트" src={likeRed} />
                    </SRedLikeIcon>
                  </CardImage>
                  <STextInfo>
                    <STitle>{heart.store.category}</STitle>
                    <SArea>{heart.store.addressName}</SArea>
                    <SText>{cutStringLength(heart.store.storeName, 13)}</SText>
                  </STextInfo>
                </SCard>
              </SCardContainer>
            );
          })
        ) : (
          <NoImage
            title="찜을 한 펫플레이스가 없습니다."
            body1="관심있는 펫플레이스를 하트 아이콘을 눌러 '찜'하시면,"
            body2="더욱 편리하게 이용하실 수 있어요!"
          />
        )}
      </SItemContainer>
    </SContainer>
  );
};
export default HeartList;
