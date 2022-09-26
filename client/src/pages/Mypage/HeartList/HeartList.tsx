import { CgFontSpacing } from "react-icons/cg";
import styled, { css } from "styled-components";

import { mobile, tablet } from "../../../assets";
import like from "../../../assets/icons/like.png";
import likeRed from "../../../assets/icons/likeRed.png";
import user from "../../../assets/images/mypage/user.png";
import { heartDummyData } from "./HeartDummyData";

// interface Props {
//   storeId: number;
//   image: string;
//   category: string;
//   storeName: string;
//   addressName: string;
//   storeImages: { storeImage: string }[];
// }

const SContainer = styled.div`
  font-family: "ONE-Mobile-Regular";
  display: flex;
  overflow-x: hidden;
  flex-direction: column;
  width: 100%;

  height: auto;
  padding: 80px 40px 20px 40px;

  @media (max-width: 900px) {
    justify-content: center;
    height: auto;
    width: 500px;
  }

  ${mobile(css`
    justify-content: center;
    width: 270px;
    height: auto;
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
  font-size: 20px;
  line-height: 23px;
  color: ${({ theme }) => theme.colors.black500};
`;

const SRedLikeIcon = styled.span`
  position: absolute;
  top: 82%;
  right: 7%;
`;
console.log(heartDummyData);

const HeartList = () => {
  return (
    <SContainer>
      <SHeader>
        <img sizes="24" alt="하트아이콘" src={like} />
        <div>찜</div>
      </SHeader>
      <SItemContainer>
        {heartDummyData.map((heart: any) => (
          <SCardContainer key={heart.store.storeId}>
            <SCard>
              <CardImage>
                <img
                  src={
                    heart.storeImages.length >= 1
                      ? heart.storeImages[0].storeImage
                      : user
                  } // 기본이미지 수정 필요
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
                    ? heart.store.addressName.slice(0, 4)
                    : null}
                  {/* splice(" ").slice(0, 4).join(" ")..? 시,구,군까지 출력 */}
                </SArea>
                <SText>{heart.store.storeName}</SText>
              </STextInfo>
            </SCard>
          </SCardContainer>
        ))}
      </SItemContainer>
    </SContainer>
  );
};

export default HeartList;
