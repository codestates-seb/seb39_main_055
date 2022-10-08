import InteractiveImage from "../../InteractiveImage/InteractiveImage";
import { PostImagesProps } from "../PreviewImages/PreviewImages";
import { SMImgList, SMImgUList, SModalSection } from "./style";

type DefaultImgSelectProps = Omit<
  PostImagesProps,
  "setImages" | "editorRef"
> & {
  closeModal: () => void;
};

const DefaultImgSelect = ({
  images,
  defaultId,
  setDefaultId,
  closeModal,
}: DefaultImgSelectProps) => {
  const handleClick = (id: string) => {
    setDefaultId(id);
    closeModal();
  };

  return (
    <SModalSection>
      <h1>대표 이미지를 선택해주세요.</h1>
      <SMImgUList>
        {images.map(({ uri, id }, i) => (
          <SMImgList selected={defaultId ? defaultId === id : i === 0} key={id}>
            <InteractiveImage
              label="대표 이미지로 설정"
              hoverColor="#ffe033c3"
              imageURL={uri}
              alt={`${i}-th image to upload`}
              onClick={() => handleClick(id)}
            />
          </SMImgList>
        ))}
      </SMImgUList>
    </SModalSection>
  );
};

export default DefaultImgSelect;
