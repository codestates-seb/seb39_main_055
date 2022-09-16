import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";

import like from "../../assets/icons/like.png";
import search from "../../assets/icons/search.png";
import profile from "../../assets/icons/user.png";
import logo from "../../assets/images/logo/logo.png";
import Footer from "./Footer/Footer";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const SNav = styled.nav`
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 0 24px;
  background-color: #ffffff;
  box-shadow: rgb(0 0 0 / 20%) 0px 0px 4px 0px;
  z-index: 100;

  & > img {
    width: 140px;
    height: 40px;
    cursor: pointer;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.desktop}) {
    padding: 0 20px;
  }
`;

export const SMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  font-size: 25px;

  & > img {
    width: 25px;
    height: 25px;
  }

  & > img:hover {
    cursor: pointer;
  }
`;

const SSection = styled.section`
  margin: 0 auto;
  padding-top: 80px;
  min-height: calc(100vh - 300px); // nav or footer height 변경
  max-width: 1280px;
`;

const SharedLayout = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <SNav>
        <img src={logo} alt="logo" onClick={() => navigate("/")} />
        <SMenu>
          <img src={search} alt="search" />
          <img src={like} alt="like" />
          <img src={profile} alt="profile" />
        </SMenu>
      </SNav>
      <SSection>
        <Outlet />
      </SSection>
      <Footer />
    </Container>
  );
};

export default SharedLayout;
