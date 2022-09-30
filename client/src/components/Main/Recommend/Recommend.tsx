import { BsFillArrowRightCircleFill } from "react-icons/bs";
import styled, { css } from "styled-components";

import { mobile } from "../../../assets";
import Header from "./Header";
import { scrollDummyImg } from "./RecommendData";
import ScrollContents from "./ScrollContents";

const Container = styled.div`
  height: 851px;
  position: relative;
  cursor: pointer;

  ${mobile(css`
    width: 100%;
    height: auto;
    overflow-x: hidden;
  `)}
`;

const SContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: no-wrap;
  overflow-x: scroll;
  overflow-y: hidden;
`;

const ArrowIcon = styled.div`
  display: none;
  position: absolute;
  top: 5.8%;
  right: 10%;
  opacity: 0.2;
  color: black;

  ${mobile(css`
    display: block;
  `)}
`;

const Recommend = () => {
  return (
    <Container>
      <Header />
      <ArrowIcon>
        <BsFillArrowRightCircleFill size={35} />
      </ArrowIcon>
      <SContainer>
        {scrollDummyImg.map((recommend) => (
          <ScrollContents
            id={recommend.id}
            image={recommend.image}
            category={recommend.category}
            title={recommend.title}
            date={recommend.date}
            alt={recommend.alt}
            textTitle={recommend.textTitle}
            textLine1={recommend.textLine1}
            textLine2={recommend.textLine2}
            link={recommend.link}
            key={recommend.textTitle}
          />
        ))}
      </SContainer>
    </Container>
  );
};

export default Recommend;
