import { CgFontSpacing } from "react-icons/cg";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled, { css } from "styled-components";

import { getHeartList } from "../../../apis/user/heartList";
import { mobile, tablet } from "../../../assets";
import like from "../../../assets/icons/like.png";
import likeRed from "../../../assets/icons/likeRed.png";
import defaultImg from "../../../assets/images/mypage/defaultImg.jpg";
import { LoadingSpinner } from "../../../components";
import { useAppSelector } from "../../../redux";
import { Store } from "../../../types";
import { axiosInstance } from "../../../utils";
import NoImage from "../RecentList/NoImage";
import { heartDummyData } from "./HeartDummyData";

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
    width: 250px;
    height: auto;
    padding: 40px 0px 0px 25px;
  `)}
`;

const SItemContainer = styled.div`
  width: 690px;
  display: flex;
  overflow-x: auto;
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
  // width: 100%;
  height: auto;
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
`;

const CardImage = styled.div`
  position: relative;
  width: 200px;
  height: 200px;

  & > img {
    object-fit: cover;
    justify-content: space-between;
    width: 200px;
    height: 200px;
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
  color: ${({ theme }) => theme.colors.black500};
`;

const SRedLikeIcon = styled.span`
  position: absolute;
  top: 82%;
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
  //
  // console.log(data);
  return (
    <SContainer>
      <SHeader>
        <img sizes="24" alt="하트아이콘" src={like} />
        <div>찜</div>
      </SHeader>
      <SItemContainer>
        {(data?.length as number) > 0 ? (
          data?.map((heart) => (
            <SCardContainer key={heart.store.storeId}>
              <SCard onClick={() => navigate("/place/{storeId}")}>
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
                  <SArea>
                    {heart.store.addressName.length >= 1
                      ? heart.store.addressName.slice(0, 11)
                      : null}
                    {/* splice(" ").slice(0, 4).join(" ")..? 시,구,군까지 출력 */}
                  </SArea>
                  <SText>{cutStringLength(heart.store.storeName, 13)}</SText>
                </STextInfo>
              </SCard>
            </SCardContainer>
          ))
        ) : (
          <NoImage
            title="찜을 한 펫플레이스가 없습니다."
            body1="관심있는 펫플레이스를 하트 아이콘을 눌러 '짬'하시면,"
            body2="더욱 편리하게 이용하실 수 있어요!"
          />
        )}
      </SItemContainer>
    </SContainer>
  );
};
export default HeartList;
