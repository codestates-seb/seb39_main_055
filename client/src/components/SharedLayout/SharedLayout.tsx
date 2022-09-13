import { BsPerson, BsPersonCircle } from "react-icons/bs";
import { HiOutlineHeart } from "react-icons/hi";
import { RiSearchLine } from "react-icons/ri";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import logo from "../../assets/images/logo/logo.png";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const SNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 65px;
  padding: 0 200px;
  box-shadow: rgb(0 0 0 / 20%) 0px 0px 4px 0px;

  & > img {
    width: 160px;
    height: 50px;
    cursor: pointer;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.desktop}) {
    padding: 0 20px;
  }
`;

export const SMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 25px;

  & > svg:hover {
    cursor: pointer;
  }

  & > svg:nth-child(2) {
    font-size: 28px;
  }
`;

const SSection = styled.section`
  margin: 0 auto;
  min-height: calc(100vh - 365px); // nav or footer height 변경
  max-width: 1920px;
  /* border: 1px solid red; */
`;

const SFooter = styled.footer`
  height: 300px;
  border: 1px solid #f0f0f0;
  color: ${(props) => props.theme.colors.orange500};
  font-family: var(--font-noto);
  /* box-shadow: rgb(0 0 0 / 20%) 0px 0px 4px 0px; */
`;

const SharedLayout = () => {
  return (
    <Container>
      <SNav>
        <img src={logo} alt="logo" />
        <SMenu>
          <RiSearchLine />
          <HiOutlineHeart />
          <BsPersonCircle />
        </SMenu>
      </SNav>
      <SSection>
        <Outlet />
      </SSection>
      <SFooter>푸터</SFooter>
    </Container>
  );
};

export default SharedLayout;
