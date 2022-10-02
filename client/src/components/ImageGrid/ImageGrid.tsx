/* eslint-disable react/no-array-index-key */

import { Slider, useModal } from "..";
import { SButton, SContainer, SSliderContainer } from "./style";

interface Prop {
  imageList: string[] | undefined;
}

export const ImageGrid = ({ imageList }: Prop) => {
  const { openModal } = useModal();
  const renderImageList = imageList?.slice(0, 5) as string[];

  return (
    <SContainer>
      {renderImageList.map((image, index) => (
        <img key={index} src={image} alt="place" />
      ))}
      <SButton
        onClick={() =>
          openModal(
            <SSliderContainer>
              <Slider imageList={imageList} />
            </SSliderContainer>
          )
        }
      >
        사진 모두 보기
      </SButton>
    </SContainer>
  );
};
