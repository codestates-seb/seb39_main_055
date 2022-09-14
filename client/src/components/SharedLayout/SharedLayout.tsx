import { BsPersonCircle } from "react-icons/bs";
import { HiOutlineHeart } from "react-icons/hi";
import { RiSearchLine } from "react-icons/ri";
import { Outlet } from "react-router-dom";
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
    width: 160px;
    height: 45px;
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

  & > img:hover {
    cursor: pointer;
  }
`;

const SSection = styled.section`
  margin: 0 auto;
  padding-top: 80px;
  min-height: calc(100vh - 380px); // nav or footer height 변경
  /* max-width: 1920px; */
  max-width: 1280px;
`;

const SharedLayout = () => {
  return (
    <Container>
      <SNav>
        <img src={logo} alt="logo" />
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
