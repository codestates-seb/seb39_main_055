import styled from "styled-components";

import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

export const Container = styled.div`
  & > header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    height: 174px;
    background-color: #f8f8fa;

    & > h3 {
      color: ${({ theme }) => theme.colors.black500};
      font-size: 38px;
    }

    & > p {
      color: #707070;
      font-size: 20px;
    }

    @media screen and (max-width: ${({ theme }) => theme.breakPoints.mobile}) {
      & > h3 {
        font-size: 24px;
      }

      & > p {
        font-size: 14px;
      }
    }
  }
`;

export const SSection = styled.section`
  display: flex;
  height: 500px;

  @media screen and (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    height: 770px;
  }
`;

export const SImgContainer = styled.div`
  flex-basis: 50%;
  height: 500px;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media screen and (max-width: 1000px) {
    height: 350px;
  }
`;

export const SMainContainer = styled.main`
  flex-basis: 50%;
  padding: 20px 20px 0 20px;

  @media screen and (max-width: 1200px) {
    padding: 20px 0 0 0;
  }
`;

export const SButtonContainer = styled.div`
  display: flex;
  align-items: center;

  .active {
    color: ${({ theme }) => theme.colors.black500};
  }

  & > button {
    flex-grow: 1;
    padding: 0;
    border: none;
    color: ${({ theme }) => theme.colors.black200};
    background-color: inherit;
    font-size: 18px;
  }

  & > div {
    width: 1px;
    height: 13px;
    margin: 0 10px 3px 10px;
    background-color: ${({ theme }) => theme.colors.black200};
  }

  & > div:last-child {
    display: none;
  }
`;

export const SListContainer = styled.ul`
  position: relative;
  height: 440px;
  margin-top: 20px;
  padding: 5px;
  overflow-y: scroll;

  & > li:last-child {
    margin-bottom: 0;
  }

  @media screen and (max-width: 1000px) {
    height: 350px;
  }
`;

export const SLoading = styled(LoadingSpinner)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
