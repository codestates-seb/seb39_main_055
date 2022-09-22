import styled from "styled-components";

export const SNav = styled.nav`
  position: fixed;
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #ffffff;
  box-shadow: rgb(0 0 0 / 20%) 0px 0px 4px 0px;
  z-index: 3;
`;

export const SSection = styled.section`
  width: 100%;
  padding: 0 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;

  & > img {
    width: 160px;
    height: 45px;
    cursor: pointer;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.tablet}) {
    padding: 20px;
  }
`;

export const SMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 40px;
  font-size: 25px;

  & > img {
    display: none;
    width: 40px;
    height: 40px;
    padding: 10px;
    border-radius: 10px;
    transition: 0.4s all;
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.colors.black010};
    }
  }

  & > button {
    padding: 10px;
    border: none;
    border-radius: 10px;
    background-color: inherit;
    font-size: 18px;
    transition: 0.4s all;

    &:hover {
      background-color: ${({ theme }) => theme.colors.black010};
    }

    &:nth-child(1) {
      color: #ffc107;
    }

    @media screen and (max-width: ${({ theme }) => theme.breakPoints.tablet}) {
      &:nth-child(1) {
        display: none;
      }

      &:nth-child(2) {
        display: none;
      }
    }
  }
`;

export const SHamberger = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 5px 15px;
  margin-left: 10px;
  border-radius: 25px;
  color: #161616;
  font-size: 18px;
  box-shadow: 1px 3px 10px hsla(0, 0%, 0%, 0.05),
    1px 2px 4px hsla(0, 0%, 0%, 0.05), 0 4px 8px hsla(0, 0%, 0%, 0.1);
  transition: all 0.4s;
  transition: 0.4s all;

  &:hover {
    background-color: ${({ theme }) => theme.colors.black010};
    cursor: pointer;
  }

  & > img:first-child {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
`;

export const STab = styled.aside<{ isOpen: boolean }>`
  position: absolute;
  top: 50px;
  right: 0;
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  width: 200px;
  padding: 20px 0;
  box-shadow: rgb(0 0 0 / 40%) 0px 0px 4px 0px;
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.black300};
  background-color: white;
  font-size: 14px;
  animation-name: dropdown;
  animation-duration: 500ms;
  animation-direction: normal;

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
