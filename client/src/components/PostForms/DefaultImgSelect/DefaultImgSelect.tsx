import { PostImagesProps } from "../PreviewImages/PreviewImages";
import { SMImg, SMImgList, SMImgUList, SModalSection } from "./style";

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
  const handleClick = (id: number) => {
    setDefaultImg(id);
    closeModal();
  };

  return (
    <SModalSection>
      <h1>대표 이미지를 선택해주세요.</h1>
      <SMImgUList>
        {images.map(({ uri, id }, i) => (
          <SMImgList
            selected={defaultImg === i}
            onClick={() => handleClick(i)}
            key={id}
          >
            <SMImg src={uri} alt={`${i}-th image to upload`} />
          </SMImgList>
        ))}
      </SMImgUList>
    </SModalSection>
  );
};

export default DefaultImgSelect;
