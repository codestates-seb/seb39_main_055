import { Outlet } from "react-router-dom";
import styled from "styled-components";

const SNav = styled.nav`
  height: 50px;
  border: 1px solid black;
`;

const SSection = styled.section`
  height: calc(100vh - 350px);
`;

const SFooter = styled.footer`
  height: 300px;
  border: 1px solid black;
`;

const SharedLayout = () => {
  return (
    <>
      <SNav>navbar</SNav>
      <SSection>
        <Outlet />
      </SSection>
      <SFooter>footer</SFooter>
    </>
  );
};

export default SharedLayout;
