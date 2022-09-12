import { Outlet } from "react-router-dom";
import styled from "styled-components";

import logo from "../../assets/images/logo/logo.png";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const SNav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 65px;
  box-shadow: rgb(0 0 0 / 20%) 0px 0px 4px 0px;

  & > img {
    width: 160px;
    height: 50px;
  }
`;

const SSection = styled.section`
  margin: 0 auto;
  min-height: calc(100vh - 365px); // nav or footer height 변경
  max-width: 1920px;
  border: 1px solid red;
`;

const SFooter = styled.footer`
  height: 300px;
  border: 1px solid black;
  color: ${(props) => props.theme.colors.orange500};
  font-family: var(--font-noto);
`;

const SharedLayout = () => {
  return (
    <Container>
      <SNav>
        <img src={logo} alt="logo" />
      </SNav>
      <SSection>
        <Outlet />
      </SSection>
      <SFooter>푸터</SFooter>
    </Container>
  );
};

export default SharedLayout;
