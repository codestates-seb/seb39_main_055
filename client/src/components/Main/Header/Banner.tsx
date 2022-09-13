import styled, { css } from "styled-components";

import { mobile, tablet } from "../../../assets";
import Img1 from "../../../assets/images/carousel/1.png";

const SArticle = styled.article`
  width: 100vw;
  height: 700px;
`;

const SImg = styled.img`
  width: 100vw;
  height: 500px;
  object-fit: cover;
`;

const SHeader = styled.header`
  display: flex;
  padding: 20px 0px;
  height: 200px;
  background-color: white;
`;

const SHeaderBox = styled.div`
  height: 100%;
  padding-left: 100px;
  font-size: 42px;

  ${tablet(
    css`
      padding-left: 50px;
      font-size: 35px;
    `
  )}

  ${mobile(
    css`
      padding-left: 15px;
      font-size: 23px;
    `
  )}
`;

const SH1 = styled.h1`
  font-size: 1em;
  font-weight: normal;
`;

const SH2 = styled.h2`
  font-size: 0.7em;
  font-weight: lighter;
  line-height: 5rem;
`;

interface BannerProps {
  img: string;
  summary: string;
  place: string;
}

const Banner = () => {
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

export default Banner;
