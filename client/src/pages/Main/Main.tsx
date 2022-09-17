import { Fade } from "react-awesome-reveal";
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
  padding-top: 700px;

  & > section {
    display: flex;
    flex-direction: column;
    gap: 200px;
    margin: 50px 0;
    padding: 0 150px;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.tablet}) {
    & > section {
      padding: 0 20px;
    }
  }
`;

const Main = () => {
  return (
    <Container>
      <Header />
      <section>
        <Category />
        <Fade direction="left">
          <Recommend />
        </Fade>
        <Fade direction="left">
          <HotPlace />
        </Fade>
        <Fade direction="left">
          <Pick />
        </Fade>
        <Fade direction="left">
          <Review />
        </Fade>
      </section>
    </Container>
  );
};

export default Main;
