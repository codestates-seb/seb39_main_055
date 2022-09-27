import { useQuery } from "react-query";
import styled, { css } from "styled-components";

import { mobile, tablet } from "../../../assets";
import Img1 from "../../../assets/images/carousel/1.webp";
import Carousel from "../../Carousel/Carousel";
import Banner, { BannerProps } from "./Banner";

const SHeader = styled.header`
  width: 100%;
  height: 700px;
  position: absolute;
  top: 80px;
  left: 0px;

  ${tablet(css`
    height: 660px;
  `)}

  ${mobile(css`
    height: 635px;
  `)}
`;

const carouselItems = [
  {
    image: Img1,
    summary: "동양의 미를 가진 고즈넉한 숙소",
    place: "청도 ‘스테이더담’",
    link: "/",
  },
];

function bannerGenerator(details: BannerProps[]) {
  return details.map((e, i) => {
    return {
      item: (
        <Banner
          image={e.image}
          summary={e.summary}
          place={e.place}
          link={e.link}
        />
      ),
      id: i,
    };
  });
}

const Header = () => {
  /* const { isLoading, data, error } = useQuery(["mainBanner"], () => {
    "f";
  }); */

  return (
    <SHeader>
      <Carousel items={bannerGenerator(carouselItems)} />
    </SHeader>
  );
};

export default Header;
