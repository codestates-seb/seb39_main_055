import styled from "styled-components";

export const SContainer = styled.div`
  position: relative;
`;

export const SModalContainer = styled.div`
  & > main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    padding: 80px;
    background-color: #f5f5f5;

    & > header {
      color: #161616;
      font-size: 25px;
      font-family: "ONE-Mobile-Bold";
    }

    & > p {
      font-size: 20px;
    }
  }
`;

export const SButtonContainer = styled.section`
  display: flex;
  background-color: #f5f5f5;
  border: none;

  & > button {
    flex-basis: 50%;
    height: 100px;
    border: none;
    background-color: #ffffff;
    font-size: 30px;
    font-family: "ONE-Mobile-Regular";
    transition: all 0.3s;

    margin-bottom: -1px;
  }
`;

export const SDeleteButton = styled.button`
  color: #f53a3a;
`;

export const SCancelButton = styled.button`
  color: #a5a5a5;
  border-right: 2px solid #f5f5f5 !important;
`;

export const STab = styled.div<{ isOpen: boolean }>`
  position: absolute;
  right: 0;
  top: 30px;

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
  z-index: 50;
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
