import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";

import ham from "../../assets/icons/ham.png";
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
  gap: 10px;
  font-size: 25px;

  & > img {
    width: 40px;
    height: 40px;
    padding: 10px;
    border-radius: 10px;
    transition: 0.4s all;
  }

  & > img:hover {
    background-color: ${({ theme }) => theme.colors.black010};
    cursor: pointer;
  }
`;

export const SHamberger = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 5px 10px;
  border-radius: 25px;
  box-shadow: rgb(0 0 0 / 40%) 0px 0px 4px 0px;
  transition: 0.4s all;

  &:hover {
    background-color: ${({ theme }) => theme.colors.black010};
    cursor: pointer;
  }

  & > img:first-child {
    width: 15px;
    height: 15px;
  }

  & > img:last-child {
    width: 20px;
    height: 20px;
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
          <SHamberger>
            <img src={ham} alt="hamberger" />
            <img src={profile} alt="profile" />
          </SHamberger>
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
