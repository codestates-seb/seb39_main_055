import parse from "html-react-parser";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

import { getThreadList } from "../../../apis/user/threadList";
import { mobile, tablet } from "../../../assets";
import photoShoot from "../../../assets/icons/photoShoot.png";
import defaultImg from "../../../assets/images/mypage/defaultImg.jpg";
import { LoadingSpinner } from "../../../components";
import useAppContext from "../../../components/Modal/useAppContext";
import { useAppSelector } from "../../../redux";
import NoImage from "../RecentList/NoImage";
import { post } from "./PostDummyData";

const SContainer = styled.div`
  font-family: "ONE-Mobile-Regular";
  display: flex;
  overflow-x: hidden;
  flex-direction: column;
  width: 100%;
  cursor: pointer;

  height: auto;
  padding: 20px 40px 80px 40px;

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
  font-size: 16px;
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

const SLoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 33%;
`;

const MyPostList = () => {
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
    ["thread", userInfos?.userId],
    getThreadList,
    { retry: false, cacheTime: 3000 }
  );
  console.log(data);
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
        <img sizes="24" alt="" src={photoShoot} />
        <div>댕댕이숲</div>
      </SHeader>
      <SItemContainer>
        {(data?.length as number) > 0 ? (
          data?.map((post: any) => (
            <SCardContainer key={post.threadId}>
              <SCard onClick={() => navigate("/post/{threadId}")}>
                <img
                  src={
                    post.threadImages.length >= 1
                      ? post.threadImages[0].threadImage
                      : defaultImg
                  }
                  alt={post.threadId}
                />
                <STextInfo>
                  <STitle>{parse(post.body as string)}</STitle>
                  <SCreatedAt>{post.createdAt.substring(0, 10)}</SCreatedAt>
                  <SNickname>{post.user.nickname}</SNickname>
                </STextInfo>
              </SCard>
            </SCardContainer>
          ))
        ) : (
          <NoImage
            title="댕댕이숲에 작성한 게시글이 없습니다."
            body1="나의 반려동물과 관련하여 소통하며"
            body2="사람들과 다양한 이야기를 나눠보세요!"
          />
        )}
      </SItemContainer>
    </SContainer>
  );
};

export default MyPostList;
