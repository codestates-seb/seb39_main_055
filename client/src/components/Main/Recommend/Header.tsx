import styled, { css } from "styled-components";

import { mobile } from "../../../assets";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 0px 10px 20px 10px;
  font-family: "ONE Mobile";

  ${mobile(css`
    width: 400px;
    align-items: flex-start;
  `)}

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
  ${mobile(css`
    align-items: center;
  `)}
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
