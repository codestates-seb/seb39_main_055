import styled from "styled-components";

export const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 380px);

  @media screen and (max-width: 1160px) {
    padding: 20px;
  }
`;

export const SListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  margin-bottom: 70px;

  @media screen and (max-width: 800px) {
    gap: 80px;
  }
`;

export const STitleContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  width: 100%;
  margin: 60px 0 20px 0;

  & > h1 {
    color: #161616;
    font-size: 40px;
  }
`;

export const SButtonContainer = styled.section`
  display: flex;
  justify-content: end;
  width: 100%;
  margin-bottom: 45px;

  & > button {
    width: 100px;
    height: 50px;
    border: 1px solid #a5a5a5;
    border-radius: 20px;
    color: #000000;
    background-color: #ffffff;
    font-size: 20px;
    font-weight: 600;
    transition: all 0.4s;

    &:hover {
      color: #ffffff;
      background-color: #ffc107;
      border-color: #ffc107;
    }

    @media screen and (max-width: 800px) {
      width: 70px;
      height: 45px;
      font-size: 14px;
    }
  }
`;

export const SLoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 800px);
`;

export const SFetchContainer = styled.section`
  margin-bottom: 70px;
`;
