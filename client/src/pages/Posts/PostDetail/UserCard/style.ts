import styled from "styled-components";

export const SUtils = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 45px 0 50px 0;

  svg {
    font-size: 40px;
    color: #a5a5a5;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      color: #161616;
    }
  }
`;

export const SUserInfo = styled.section`
  display: flex;
  align-items: center;
  gap: 15px;
  font-family: "Noto Sans KR", sans-serif;

  & > img {
    width: 68px;
    height: 68px;
    border-radius: 50%;
    object-fit: cover;
  }

  & > span:nth-child(2) {
    font-size: 20px;
    color: #161616;
    font-weight: 600;
  }

  & > span:nth-child(3) {
    font-size: 18px;
    color: #a5a5a5;
  }
`;

export const SModal = styled.div<{ isOpen: boolean }>`
  position: absolute;
  right: 0;
  top: 50px;

  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  align-items: center;

  width: 112px;
  height: 87px;
  border: 1px solid #dbdbdb;
  border-radius: 10px;
  background-color: #ffffff;
  color: #434343;
  cursor: pointer;
  font-family: "Noto Sans KR", sans-serif;

  animation-name: dropdown;
  animation-duration: 500ms;
  animation-direction: normal;

  & > div {
    flex-basis: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    transition: all 0.1s ease-in-out;

    &:hover {
      font-weight: bold;
      font-size: 18px;
    }
  }

  & > div:first-child {
    border-bottom: 1px solid #dbdbdb;
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
