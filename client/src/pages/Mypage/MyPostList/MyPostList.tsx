import styled, { css } from "styled-components";

import { mobile, tablet } from "../../../assets";
import photoShoot from "../../../assets/icons/photoShoot.png";
import user from "../../../assets/images/mypage/user.png";
import { post } from "./PostDummyData";

// interface Props {
//   threadId: number;
//   // eslint-disable-next-line react/no-unused-prop-types
//   threadImages: { image: string }[];
//   image: string;
//   body: string;
//   createdAt: string;
//   nickname: string;
// }
// data.body(앞글자 일부를 제목으로?), createdAt, user.nickname user.image 필요
const SContainer = styled.div`
  font-family: "ONE-Mobile-Regular";
  display: flex;
  overflow-x: hidden;
  flex-direction: column;
  width: 100%;

  height: auto;
  padding: 20px 40px 80px 40px;

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
  font-size: 20px;
`;

const SCreatedAt = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.black400};
`;

const SNickname = styled.div`
  font-size: 14px;
  line-height: 23px;
  color: ${({ theme }) => theme.colors.orange500};
`;
const MyPostList = () => {
  return (
    <SContainer>
      <SHeader>
        <img sizes="24" alt="" src={photoShoot} />
        <div>댕댕이숲</div>
      </SHeader>
      <SItemContainer>
        {post.map((post: any) => (
          <SCardContainer key={post.data.threadId}>
            <SCard>
              <img
                src={
                  post.data.threadImages.length >= 1
                    ? post.data.threadImages[0].image
                    : user
                } // 기본이미지 수정 필요
                alt={post.data.threadId}
              />
              <STextInfo>
                {/* data.body의 앞부분 일부가 제목으로. */}
                <STitle>{post.data.body.substring(0, 16)}</STitle>
                {/* 년,월,일 까지만 출력 */}
                <SCreatedAt>{post.data.createdAt.substring(0, 10)}</SCreatedAt>
                <SNickname>{post.data.user.nickname}</SNickname>
              </STextInfo>
            </SCard>
          </SCardContainer>
        ))}
      </SItemContainer>
    </SContainer>
  );
};

export default MyPostList;
