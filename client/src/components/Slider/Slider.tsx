/* eslint-disable react/no-array-index-key */
import "swiper/css";
import "swiper/css/navigation";

import styled from "styled-components";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

export const Wrapper = styled.div`
  height: inherit;

  .swiper {
    height: inherit;
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
  imageList: Array<{ image: string }>;
}

const Slider: React.FC<Props> = ({ imageList }) => {
  return (
    <Wrapper>
      <Swiper spaceBetween={30} navigation modules={[Navigation]}>
        {imageList.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image.image} alt="animals" />
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  );
};

export default Slider;
