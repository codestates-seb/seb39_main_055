import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import ham from "../../../assets/icons/ham.png";
import search from "../../../assets/icons/search.png";
import profile from "../../../assets/icons/user.png";
import logo from "../../../assets/images/logo/logo.png";
import { useAppSelector } from "../../../redux";
import { SHamberger, SMenu, SNav, SSection, STab } from "./style";
import { DefaultTab, UserTab } from "./Tabs";

export const SSearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  width: 40%;
  border: 1px solid #dbdbdb;
  border-radius: 20px;

  & > input {
    outline: none;
    border: none;
    width: 80%;
  }

  & > img {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  @media screen and (max-width: 700px) {
    display: none;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const tabRef = useRef<HTMLElement>(null);
  const [tabIsOpen, setTabIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { loginStatus, userInfos } = useAppSelector((state) => state.user);

  const handleTabClick = () => {
    setTabIsOpen((prev) => !prev);
  };

  const handleClickOutside = useCallback(
    ({ target }) => {
      if (tabIsOpen && !tabRef.current?.contains(target)) setTabIsOpen(false);
    },
    [tabIsOpen]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue) {
      navigate(`/search?search=${inputValue}`);
      setInputValue("");
    }
  };

  const handleSearchIconClick = () => {
    if (inputValue) navigate(`/search?search=${inputValue}`);
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <SNav>
      <SSection>
        <img src={logo} alt="logo" onClick={() => navigate("/")} />
        <SSearchBar>
          <input
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleInputKeyPress}
          />
          <img src={search} alt="search" onClick={handleSearchIconClick} />
        </SSearchBar>
        <SMenu>
          <img src={search} alt="search" onClick={handleSearchIconClick} />
          <button
            type="button"
            onClick={() => {
              navigate("/place/list");
              setInputValue("");
            }}
          >
            펫플레이스
          </button>
          <button type="button" onClick={() => navigate("/post/list")}>
            댕댕이숲
          </button>
          <SHamberger onClick={() => handleTabClick()}>
            <img src={ham} alt="hamberger" />
            <img src={userInfos ? userInfos?.image : profile} alt="profile" />
          </SHamberger>
          <STab
            isOpen={tabIsOpen}
            ref={tabRef}
            onClick={() => setTabIsOpen(false)}
          >
            {loginStatus ? <UserTab /> : <DefaultTab />}
          </STab>
        </SMenu>
      </SSection>
    </SNav>
  );
};

export default Navbar;
