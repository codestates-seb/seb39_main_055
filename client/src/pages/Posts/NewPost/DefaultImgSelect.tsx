import styled from "styled-components";

import { PostImagesProps } from "./PreviewImages";

const SModalSection = styled.section`
  padding: 30px;
  height: 100%;
`;

const SMImgUList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(0, 100px));
  gap: 10px;
  margin-top: 17px;
  max-height: 70vh;
  overflow-y: scroll;
`;

interface SelectedImg {
  selected: boolean;
}

const SMImgList = styled.li<SelectedImg>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  overflow: hidden;
  border-radius: 5px;

  border: ${({ selected }) => (selected ? "4px solid #FFD801" : "")};
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
