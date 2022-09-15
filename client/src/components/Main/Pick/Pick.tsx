import { useState } from "react";
import { CgChevronRight } from "react-icons/cg";
import styled from "styled-components";

import pickExample from "../../../assets/images/PickPage/pickExample.png";
import { images, linkAdress1 } from "./pickPageAssets";
import SideText from "./SideText";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Contents = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 780px;
  height: 570px;
  gap: 20px;

  @media screen and (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-flow: row wrap;
  }
`;

const SideContents = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  height: 440px;
  width: 110px;
`;

const UserPickContents = styled.span`
  width: 480px;
  height: 440px;
  position: relative;
  align-items: center;

  & > img {
    widht: 480px;
    height: 440px;
    object-fit: contain;
`;

const ContentsInfo = styled.div`
  color: #ffff;
  font-size: 32px;
  line-height: 42px;
  position: absolute;
  top: 80%;
  left: 7%;
`;

const SecondTextLine = styled.a`
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
      <SideText />
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
