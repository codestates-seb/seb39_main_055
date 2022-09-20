import styled from "styled-components";

import HeartDummyData, { heartDummyData } from "./HeartDummyData";

interface Props {
  image: string;
  category: string;
  alt: string;
  adress: string;
  text: string;
  link: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 33%;
  width: 100%;
  border: 1px solid red;
`;

const Header = styled.div`
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

const InfoContainer = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: row;
  width: 70%;
  height: auto;
`;

const ImageContainer = styled.div`
  margin: 10px;

  & > img {
    object-fit:cover
    justify-content: space-between;
    width: 100%;
    height: auto%;
    flex-direction: column;
  }
`;

const TextInfo = styled.div`
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Title = styled.div`
  font-size: 12px;
`;

const Area = styled.div`
  font-size: 14px;
`;

const Text = styled.div`
  font-size: 16px;
`;

const HeartList = () => {
  return (
    <Container>
      <Header>
        <img
          sizes="24"
          alt="하트아이콘"
          src="https://user-images.githubusercontent.com/104320234/191067164-c27eb225-2a77-46a8-9dd6-99d2f50febe3.png"
        />
        <div>찜</div>
      </Header>
      <InfoContainer>
        <ImageContainer>
          <img
            src="https://user-images.githubusercontent.com/104320234/191087779-c979a023-6f7c-4be5-bbde-bc1b91a0f845.jpeg"
            alt="제주 솔펜션"
          />
          <TextInfo>
            <Title>숙소</Title>
            <Area>제주 제주시</Area>
            <Text>제주 솔펜션 (객실에서 보는 제주일출)</Text>
          </TextInfo>
        </ImageContainer>
        <ImageContainer>
          <img
            src="https://user-images.githubusercontent.com/104320234/191087779-c979a023-6f7c-4be5-bbde-bc1b91a0f845.jpeg"
            alt="제주 솔펜션"
          />
          <TextInfo>
            <Title>숙소</Title>
            <Area>제주 제주시</Area>
            <Text>제주 솔펜션 (객실에서 보는 제주일출)</Text>
          </TextInfo>
        </ImageContainer>
        <ImageContainer>
          <img
            src="https://user-images.githubusercontent.com/104320234/191087779-c979a023-6f7c-4be5-bbde-bc1b91a0f845.jpeg"
            alt="제주 솔펜션"
          />
          <TextInfo>
            <Title>숙소</Title>
            <Area>제주 제주시</Area>
            <Text>제주 솔펜션 (객실에서 보는 제주일출)</Text>
          </TextInfo>
        </ImageContainer>
        <ImageContainer>
          <img
            src="https://user-images.githubusercontent.com/104320234/191087779-c979a023-6f7c-4be5-bbde-bc1b91a0f845.jpeg"
            alt="제주 솔펜션"
          />
          <TextInfo>
            <Title>숙소</Title>
            <Area>제주 제주시</Area>
            <Text>제주 솔펜션 (객실에서 보는 제주일출)</Text>
          </TextInfo>
        </ImageContainer>
      </InfoContainer>
    </Container>
  );
};

export default HeartList;
