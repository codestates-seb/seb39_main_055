import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 50px 10px;
  font-family: "ONE Mobile";

  & > h1 {
    color: ${({ theme }) => theme.colors.black500};
    font-size: 38px;
    font-style: normal;
    text-align: center;
    font-weight: 400;
  }
`;

const SubTitle = styled.div`
  font-family: "ONE Mobile";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 22px;
  color: #8d8d8d;
  text-align: center;
`;

const Header = () => {
  return (
    <Container>
      <h1>오늘의 추천 플레이스</h1>
      <SubTitle>반려동물과 함께 가볍게 떠나봐요.</SubTitle>
    </Container>
  );
};

export default Header;
