import styled from "styled-components";

import Carousel from "../../Carousel/Carousel";
import Banner1 from "./Banner1";

const SHeader = styled.header`
  width: 100%;
  height: 700px;
`;

const SImg = styled.img`
  width: 100%;
  height: 600px;
`;

const carouselItems = [
  {
    item: <Banner1 />,
    id: 0,
  },
  {
    item: <Banner1 />,
    id: 1,
  },
  {
    item: <Banner1 />,
    id: 2,
  },
];

const Header = () => {
  return (
    <SHeader>
      <Carousel items={carouselItems} />
    </SHeader>
  );
};

export default Header;
