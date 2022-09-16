import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import ham from "../../../assets/icons/ham.png";
import like from "../../../assets/icons/like.png";
import search from "../../../assets/icons/search.png";
import profile from "../../../assets/icons/user.png";
import logo from "../../../assets/images/logo/logo.png";
import { DefaultTab, UserTab } from "./Tabs";

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
  position: relative;
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

export const STab = styled.aside<{ isOpen: boolean }>`
  position: absolute;
  top: 45px;
  right: 0;
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  width: 200px;
  box-shadow: rgb(0 0 0 / 40%) 0px 0px 4px 0px;
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.black300};
  background-color: white;
  font-size: 14px;

  & > div {
    display: flex;
    justify-content: center;
    padding: 15px 15px;
  }

  & > div:hover {
    background-color: ${({ theme }) => theme.colors.black010};
    cursor: pointer;
  }

  & > div:first-child {
    border-radius: 10px 10px 0 0;
  }

  & > div:last-child {
    border-radius: 0 0 10px 10px;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const [tabIsOpen, setTabIsOpen] = useState(false);
  const tabRef = useRef<HTMLElement>(null);

  const handleClickOutside = useCallback(
    ({ target }) => {
      if (tabIsOpen && !tabRef.current?.contains(target)) setTabIsOpen(false);
    },
    [tabIsOpen]
  );

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleTabClick = () => {
    setTabIsOpen((prev) => !prev);
  };

  const isLogin = false;

  return (
    <SNav>
      <img src={logo} alt="logo" onClick={() => navigate("/")} />
      <SMenu>
        <img src={search} alt="search" />
        <img src={like} alt="like" />
        <SHamberger onClick={() => handleTabClick()}>
          <img src={ham} alt="hamberger" />
          <img src={profile} alt="profile" />
        </SHamberger>
        <STab isOpen={tabIsOpen} ref={tabRef}>
          {isLogin ? <DefaultTab /> : <UserTab />}
        </STab>
      </SMenu>
    </SNav>
  );
};

export default Navbar;
