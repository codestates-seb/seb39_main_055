import styled from "styled-components";

import love from "../../../assets/images/mypage/love.png";
import { postDummyData } from "./PostDummyData";

interface Props {
  image: string;
  category: string;
  alt: string;
  adress: string;
  text: string;
  link: string;
}

const SContainer = styled.div`
  font-family: "ONE-Mobile-Regular";
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  padding: 20px 40px 20px 40px;
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
  position: relative;

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
  font-size: 20px;
  line-height: 23px;
`;

const MyPostList = () => {
  return (
    <SContainer>
      <SHeader>
        <img sizes="24" alt="" src={love} />
        <div>댕댕이숲</div>
      </SHeader>
      <SInfoContainer>
        <SImageContainer>
          <img
            src="https://user-images.githubusercontent.com/104320234/191087779-c979a023-6f7c-4be5-bbde-bc1b91a0f845.jpeg"
            alt="제주 솔펜션"
          />
          <STextInfo>
            <STitle>숙소</STitle>
            <SArea>제주 제주시</SArea>
            <SText>제주 솔펜션 (객실에서 보는 제주일출)</SText>
          </STextInfo>
        </SImageContainer>
        <SImageContainer>
          <img
            src="https://user-images.githubusercontent.com/104320234/191087779-c979a023-6f7c-4be5-bbde-bc1b91a0f845.jpeg"
            alt="제주 솔펜션"
          />
          <STextInfo>
            <STitle>숙소</STitle>
            <SArea>제주 제주시</SArea>
            <SText>제주 솔펜션 (객실에서 보는 제주일출)</SText>
          </STextInfo>
        </SImageContainer>
        <SImageContainer>
          <img
            src="https://user-images.githubusercontent.com/104320234/191087779-c979a023-6f7c-4be5-bbde-bc1b91a0f845.jpeg"
            alt="제주 솔펜션"
          />
          <STextInfo>
            <STitle>숙소</STitle>
            <SArea>제주 제주시</SArea>
            <SText>제주 솔펜션 (객실에서 보는 제주일출)</SText>
          </STextInfo>
        </SImageContainer>
        <SImageContainer>
          <img
            src="https://user-images.githubusercontent.com/104320234/191087779-c979a023-6f7c-4be5-bbde-bc1b91a0f845.jpeg"
            alt="제주 솔펜션"
          />
          <STextInfo>
            <STitle>숙소</STitle>
            <SArea>제주 제주시</SArea>
            <SText>제주 솔펜션 (객실에서 보는 제주일출)</SText>
          </STextInfo>
        </SImageContainer>
      </SInfoContainer>
    </SContainer>
  );
};

export default MyPostList;
