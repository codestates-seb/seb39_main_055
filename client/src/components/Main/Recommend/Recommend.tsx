import { BsFillArrowRightCircleFill } from "react-icons/bs";
import styled, { css } from "styled-components";

import { mobile } from "../../../assets";
import Header from "./Header";
import { scrollDummyImg } from "./RecommendData";
import ScrollContents from "./ScrollContents";

const Container = styled.div`
  height: 851px;
  position: relative;

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
        {scrollDummyImg.map((e) => (
          <ScrollContents
            id={e.id}
            image={e.image}
            category={e.category}
            title={e.title}
            date={e.date}
            alt={e.alt}
            textTitle={e.textTitle}
            textLine1={e.textLine1}
            textLine2={e.textLine2}
            link={e.link}
            key={e.textTitle}
          />
        ))}
      </SContainer>
    </Container>
  );
};

export default Recommend;
