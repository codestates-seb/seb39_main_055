import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";

const SContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const SSection = styled.section`
  margin: 0 auto;
  padding-top: 80px;
  min-height: calc(100vh - 300px); // nav or footer height 변경
  max-width: 1280px;
`;

const SharedLayout = () => {
  return (
    <SContainer>
      <Navbar />
      <SSection>
        <Outlet />
      </SSection>
      <Footer />
    </SContainer>
  );
};

export default SharedLayout;
