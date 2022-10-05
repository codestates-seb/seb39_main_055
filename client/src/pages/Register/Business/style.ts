import styled from "styled-components";

export const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 100px 0;
  min-height: calc(100vh - 380px);

  & > h1 {
    margin-bottom: 32px;
    color: #161616;
    font-size: 32px;
  }

  & > p {
    margin-bottom: 32px;
    color: #767676;
  }

  & > form {
    display: flex;
    flex-direction: column;
    gap: 60px;
    width: 100%;
    max-width: 660px;
    padding: 100px 60px;
    border: 1px solid #dbdbdb;
    border-radius: 0 0 10px 10px;
    font-family: "Noto Sans KR", sans-serif;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.tablet}) {
    & > div {
      width: 90%;
    }

    & > form {
      width: 90%;
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.mobile}) {
    margin: 50px 0;

    & > h1 {
      font-size: 21px;
    }

    & > form {
      padding: 25px;
    }
  }
`;

export const SButtonContainer = styled.section`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
