/* eslint-disable react/no-array-index-key */
import "swiper/css";
import "swiper/css/navigation";

import styled from "styled-components";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

export const Wrapper = styled.div<{ height: string }>`
  height: ${({ height }) => height};
  border-radius: 12px;

  .swiper {
    height: inherit;
    border-radius: 12px;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: inherit;
    border-radius: 12px;
  }

  .swiper-button-next::after {
    color: white;
    font-size: 30px !important;
  }

  .swiper-button-prev::after {
    color: white;
    font-size: 30px !important;
  }
`;

interface Props {
  imageList: Array<string> | undefined;
  height?: string;
}

const Slider: React.FC<Props> = ({ imageList, height = "inherit" }) => {
  return (
    <Wrapper height={height}>
      <Swiper navigation modules={[Navigation]}>
        {imageList?.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt="animals" />
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  );
};

export default Slider;
