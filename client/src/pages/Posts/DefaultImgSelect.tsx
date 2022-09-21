import { css } from "@emotion/react";
import styled from "styled-components";

import { PostImagesProps, SImg, SList } from "./PreviewImages";

const SModalSection = styled.section`
  padding: 30px;
  height: 100%;
`;

const SHeader = styled.header``;

const SMImgUList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(75px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(calc((100% - 40px) / 5), 0));
  gap: 10px;
  margin-top: 17px;
  height: 400px;
  overflow: hidden;
`;

interface SelectedImg {
  selected: boolean;
}

const SMImgList = styled.li<SelectedImg>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow: hidden;
  border-radius: 5px;

  border: ${({ selected }) => (selected ? "4px solid orange" : "")};
`;

const SMImg = styled.img`
  object-fit: cover;
  max-height: 100%;
`;

type DefaultImgSelectProps = Omit<
  PostImagesProps,
  "setImages" | "editorRef"
> & {
  closeModal: () => void;
};

const DefaultImgSelect = ({
  images,
  defaultImg,
  setDefaultImg,
  closeModal,
}: DefaultImgSelectProps) => {
  const handleClick = (idx: number) => {
    setDefaultImg(idx);
    closeModal();
  };
  return (
    <SModalSection>
      <h1>대표 이미지를 선택해주세요.</h1>
      <SMImgUList>
        {images.map(({ uri, md5 }, i) => (
          <SMImgList
            selected={defaultImg === i}
            onClick={() => handleClick(i)}
            key={md5}
          >
            <SMImg src={uri} alt={`${i}-th image to upload`} />
          </SMImgList>
        ))}
      </SMImgUList>
    </SModalSection>
  );
};

export default DefaultImgSelect;
