import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import search from "../../../assets/icons/search.png";

export const SSearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  margin: 0 auto;
  margin-top: 100px;
  width: 75%;
  height: 55px;
  border: 1px solid #707070;
  border-radius: 40px;
  transition: all 0.4s;

  & > input {
    outline: none;
    border: none;
    width: 90%;
    font-size: 18px;
  }

  & > img {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
`;

interface SearchBarProps {
  className?: string;
}

const SearchBar = ({ className }: SearchBarProps) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const defaultResultpath = `/search?search=${inputValue}&category=all`;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue) {
      navigate(defaultResultpath);
      setInputValue("");
    }
  };

  const handleSearchIconClick = () => {
    if (inputValue) navigate(defaultResultpath);
  };

  return (
    <SSearchBar className={className}>
      <input
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleInputKeyPress}
        placeholder="반려 동물과 함께하고 싶은 장소를 검색하세요."
      />
      <img src={search} alt="search" onClick={handleSearchIconClick} />
    </SSearchBar>
  );
};

export default SearchBar;
