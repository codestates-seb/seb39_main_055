import styled from "styled-components";

import {
  Category,
  Header,
  HotPlace,
  Pick,
  Recommend,
  Review,
} from "../../components";

const Container = styled.div`
  min-height: inherit;

  & > section {
    display: flex;
    flex-direction: column;
    gap: 50px;
    margin: 50px 0;
    padding: 0 300px;
  }

  @media screen and (max-width: 1260px) {
    & > section {
      padding: 0;
    }
  }
`;

const Main = () => {
  return (
    <Container>
      <Header />
      <section>
        <Category />
        <Recommend />
        <HotPlace />
        <Pick />
        <Review />
      </section>
    </Container>
  );
};

export default Main;
