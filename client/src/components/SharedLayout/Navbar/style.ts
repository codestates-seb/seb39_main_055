import styled from "styled-components";

export const SNav = styled.nav`
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
  gap: 11px;
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

  & > button {
    border: none;
    background-color: inherit;
    font-size: 14px;
  }

  & > button:first-child {
    color: #ffc107;
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
    border-radius: 50%;
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
  animation-name: dropdown;
  animation-duration: 500ms;
  animation-direction: normal;

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

  @keyframes dropdown {
    from {
      opacity: 0;
      transform: translateY(5px);
    }
    to {
      opacity: 1;
    }
  }
`;
