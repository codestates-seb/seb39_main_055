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
    font-size: 32px;
  }
`;

export const SButtonContainer = styled.section`
  display: flex;
  justify-content: end;
  width: 100%;
  margin-bottom: 45px;

  & > button {
    padding: 10px 20px;
    color: #161616;
    background-color: inherit;
    border: none;
    border-radius: 20px;
    font-size: 16px;
    transition: all 0.4s;
    box-shadow: 1px 3px 10px hsla(0, 0%, 0%, 0.05),
      1px 2px 4px hsla(0, 0%, 0%, 0.05), 0 4px 8px hsla(0, 0%, 0%, 0.1);

    &:hover {
      background-color: #ffc107;
      border-color: #ffc107;
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
