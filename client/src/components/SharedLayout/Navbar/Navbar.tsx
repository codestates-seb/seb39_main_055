import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import ham from "../../../assets/icons/ham.png";
import like from "../../../assets/icons/like.png";
import search from "../../../assets/icons/search.png";
import profile from "../../../assets/icons/user.png";
import logo from "../../../assets/images/logo/logo.png";
import { useAppSelector } from "../../../redux";
import { SHamberger, SMenu, SNav, STab } from "./style";
import { DefaultTab, UserTab } from "./Tabs";

const Navbar = () => {
  const navigate = useNavigate();
  const tabRef = useRef<HTMLElement>(null);
  const [tabIsOpen, setTabIsOpen] = useState(false);
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

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <SNav>
      <img src={logo} alt="logo" onClick={() => navigate("/")} />
      <SMenu>
        {/* <img src={search} alt="search" /> */}
        <button type="button" onClick={() => navigate("/place/list")}>
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
    </SNav>
  );
};

export default Navbar;
