import { Outlet } from "react-router-dom";
import styled from "styled-components";

import logo from "../../assets/images/logo/logo.png";

const SNav = styled.nav`
  height: 50px;
  border: 1px solid black;
`;

const SSection = styled.section`
  min-height: calc(
    100vh - 350px
  ); // 100vh - nav - footer 모든 디스플레이 height 대응
`;

const SFooter = styled.footer`
  height: 300px;
  border: 1px solid black;
  font-family: var(--font-noto);
`;

const SharedLayout = () => {
  return (
    <>
      <SNav>
        <img src={logo} alt="logo" />
      </SNav>
      <SSection>
        <Outlet />
      </SSection>
      <SFooter>푸터</SFooter>
    </>
  );
};

export default SharedLayout;
