import styled from "styled-components";

import Img1 from "../../../assets/images/carousel/1.png";

const SArticle = styled.article`
  width: 100vw;
  height: 700px;
`;

const SImg = styled.img`
  width: 100vw;
  height: 500px;
`;

const SHeader = styled.header`
  display: flex;
  justify-content: center;
  padding: 20px 0px;
  height: 200px;
  background-color: white;
`;

const SHeaderBox = styled.div`
  height: 100%;
`;

const SH1 = styled.h1`
  font-size: 42px;
  font-weight: normal;
`;

const SH2 = styled.h2`
  font-size: 30px;
  font-weight: lighter;
  line-height: 5rem;
`;

const Banner1 = () => {
  return (
    <SArticle>
      <SImg src={Img1} />
      <SHeader>
        <SHeaderBox>
          <SH1>동양의 미를 가진 고즈넉한 숙소</SH1>
          <SH2>청도 ‘스테이더담’</SH2>
        </SHeaderBox>
      </SHeader>
    </SArticle>
  );
};

export default Banner1;
