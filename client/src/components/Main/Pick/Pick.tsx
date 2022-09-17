import { useState } from "react";
import { CgChevronRight } from "react-icons/cg";
import styled, { css } from "styled-components";

import { mobile } from "../../../assets";
import pickExample from "../../../assets/images/PickPage/pickExample.png";
import { images, linkAdress1 } from "./PickData";
import SideText from "./SideText";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile(css`
    flex-direction: column;
    align-items: center;
    height: 610px;
  `)}
`;

const TextContainer = styled.div`
  margin-top: 185px;
  ${mobile(css`
    flex-wrap: wrap;
    margin-top: 0px;
  `)}
`;

const Contents = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 570px;
  gap: 15px;

  ${mobile(css`
    flex-direction: column;
    align-items: center;
  `)}
`;

const SideContents = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  height: 440px;
  width: 110px;

  ${mobile(css`
    flex-direction: row;
    height: 100px;
  `)}

  & > img {
    ${mobile(css`
      widht: 100px;
      height: 100px;
    `)}
  }
`;

const UserPickContents = styled.span`
  width: 440px;
  height: 400px;
  position: relative;
  align-items: center;

  & > img {
    widht: 440px;
    height: 400px;
    object-fit: contain;
    
    ${mobile(css`
      widht: 380px;
      height: 340px;
      margin: 0% 8.7%;
    `)}
    `;

const ContentsInfo = styled.div`
  font-size: 32px;
  line-height: 42px;
  position: absolute;
  top: 75%;
  left: 7%;
  opacity: 0.7;

  :hover {
    opacity: 0.8;
  }
  & > a {
    color: #ffff;
  }

  ${mobile(css`
    top: 58%;
    left: 15%;
    font-size: 20px;
    line-height: 30px;
  `)}
`;

const SecondTextLine = styled.a`
  color: #ffff;
  display: flex;
  align-items: center;
`;

const Pick = () => {
  // const [defaultImg, setDefaultImg] = useState(images);
  // const [crrImg, setCrrImg] = useState(images[0]);
  // const handleOnClick = (id: number) => {
  //   setCrrImg(images.find((i) => i.id === id));  };
  const [crrImg, setCrrImg] = useState(images[0]);
  const handleOnClick = (e: any) => {
    setCrrImg(e.target.value);
  };
  return (
    <Container>
      <TextContainer>
        <SideText />
      </TextContainer>
      <Contents>
        <SideContents>
          {/* onClick={handleOnClick} crrImg={crrImg} images={images} /> */}
          <img
            onChange={handleOnClick}
            alt="hand"
            src="https://user-images.githubusercontent.com/104320234/189981170-e4ceda7e-b5ff-4de1-8791-be0679027363.png"
          />
          <img
            onClick={handleOnClick}
            alt="ktx"
            src="https://user-images.githubusercontent.com/104320234/190197236-2c14cd20-1867-4562-a249-abe026dcc096.png"
          />
          <img
            onClick={handleOnClick}
            alt="airplane"
            src="https://user-images.githubusercontent.com/104320234/190197670-8d50fc24-c298-449c-9bae-cd69a3c73e46.png"
          />
        </SideContents>
        <UserPickContents>
          {/* {crrImg} */}
          <img alt="" src={pickExample} />
          <ContentsInfo>
            <a href={linkAdress1}>KTX SRT 동반 탑승규정</a>
            <SecondTextLine href={linkAdress1}>
              2022 상반기 ver.
              <CgChevronRight size={40} />
            </SecondTextLine>
          </ContentsInfo>
        </UserPickContents>
      </Contents>
    </Container>
  );
};

export default Pick;
