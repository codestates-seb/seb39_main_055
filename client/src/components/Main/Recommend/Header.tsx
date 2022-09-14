import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 50px 10px;
`;

const HeadTitle = styled.div`
  font-family: "ONE Mobile";
  font-style: normal;
  font-weight: 400;
  font-size: 42px;
  text-align: center;
  color: #161616;
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
      <HeadTitle>오늘의 추천 플레이스</HeadTitle>
      <SubTitle>반려동물과 함께 가볍게 떠나봐요.</SubTitle>
    </Container>
  );
};

export default Header;
