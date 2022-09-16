import styled, { css } from "styled-components";

import { mobile } from "../../../assets";
import Header from "./Header";
import { scrollDummyImg } from "./RecommendData";
import ScrollContents from "./ScrollContents";

const Container = styled.div`
  height: 851px;
  margin-top: 50px;

  ${mobile(css`
    width: 400px;
    padding-right: 30px;
  `)}
`;

const SContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: no-wrap;
  overflow-x: scroll;
  overflow-y: hidden;
  // height: 851px;
`;

const Recommend = () => {
  return (
    <Container>
      <Header />
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
