import styled from "styled-components";

import Carousel from "../../Carousel/Carousel";
import Banner from "./Banner";

const SHeader = styled.header`
  width: 100%;
  height: 700px;
`;

const carouselItems = [
  {
    item: <Banner />,
    id: 0,
  },
  {
    item: <Banner />,
    id: 1,
  },
  {
    item: <Banner />,
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
