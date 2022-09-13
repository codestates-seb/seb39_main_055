import styled from "styled-components";

export const Container = styled.div`
  & > header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    align-items: center;
    padding: 50px 10px;
    background-color: #f8f8fa;

    & > h3 {
      color: ${({ theme }) => theme.colors.black500};
      font-size: 42px;
    }

    & > p {
      color: ${({ theme }) => theme.colors.black100};
      font-size: 20px;
    }
  }
`;

export const SSection = styled.section`
  display: flex;
  height: 600px;

  @media screen and (max-width: 750px) {
    display: flex;
    flex-direction: column;
    height: 1200px;
  }
`;

export const SImgContainer = styled.div`
  flex-basis: 50%;

  & > img {
    width: 100%;
    height: 100%;
  }
  /* 
  @media screen and (max-width: 750px) {
    height: 500px;
  } */
`;

export const SMainContainer = styled.main`
  flex-basis: 50%;
  padding: 20px;
  /* border: 1px solid black; */
`;

export const SButtonContainer = styled.div`
  display: flex;
  align-items: center;
  /* border: 1px solid black; */

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
`;

export const SListContainer = styled.ul`
  height: 540px;
  margin-top: 20px;
  padding: 0 20px;
  /* border: 1px solid black; */
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 5px;
    background-color: lightgray;
  }

  &::-webkit-scrollbar-thumb {
    background-color: black;
  }

  & > li {
    height: 150px;
    border: 1px solid black;
  }
`;

const HotPlace = () => {
  return (
    <Container>
      <header>
        <h3>요즘 많이 찾는 핫플</h3>
        <p>나의 반려동물과 함께 잊지못할 추억을 쌓아보세요.</p>
      </header>
      <SSection>
        <SImgContainer>
          <img
            src="data:image/jpeg;base64,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"
            alt="hotel"
          />
        </SImgContainer>
        <SMainContainer>
          <SButtonContainer>
            <button type="button">숙소</button>
            <div />
            <button type="button">미용</button>
            <div />
            <button type="button">카페</button>
            <div />
            <button type="button">맛집</button>
            <div />
            <button type="button">운동장</button>
            <div />
            <button type="button">동물병원</button>
          </SButtonContainer>
          <SListContainer>
            <li>장소1</li>
            <li>장소2</li>
            <li>장소3</li>
            <li>장소4</li>
            <li>장소5</li>
            <li>장소6</li>
            <li>장소7</li>
            <li>장소8</li>
          </SListContainer>
        </SMainContainer>
      </SSection>
    </Container>
  );
};

export default HotPlace;
