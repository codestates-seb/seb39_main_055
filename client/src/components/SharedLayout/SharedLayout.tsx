import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";

import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";

const SContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const SSection = styled.section<{ isOverWidth: boolean }>`
  margin: 0 auto;
  padding-top: 80px;
  min-height: calc(100vh - 300px); // nav or footer height 변경
  max-width: ${({ isOverWidth }) => (isOverWidth ? "1600px" : "1130px")};
`;

const SharedLayout = () => {
  const { pathname } = useLocation();
  const [isOverWidth, setIsOverWidth] = useState(false);

  useEffect(() => {
    if (pathname === "/search" || pathname === "/place/list") {
      setIsOverWidth(true);
    } else {
      setIsOverWidth(false);
    }
  }, [pathname]);

  return (
    <SContainer>
      <Navbar />
      <SSection isOverWidth={isOverWidth}>
        <Outlet />
      </SSection>
      <Footer />
    </SContainer>
  );
};

export default SharedLayout;
