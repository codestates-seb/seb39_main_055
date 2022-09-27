import styled, { css } from "styled-components";

import { mobile, tablet } from "../../../assets";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;

  text-decoration: underline;
  text-underline-position: under;
  text-decoration-thickness: 1px;
  gap: 20px;
  font-family: ONE Mobile;
  font-weight: 400;
  font-size: 38px;
  color: ${({ theme }) => theme.colors.black500};

  @media screen and (max-width: 1110px) {
    margin-bottom: 30px;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-direction: row;
    font-size: 34px;
    flex-wrap: wrap;
    text-decoration: none;
    margin-left: 80px;
    gap: 10px;
  }
  ${mobile(css`
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    font-size: 34px;
    text-decoration: none;
    gap: 10px;
    margin-bottom: 30px;
    margin-left: 0px;
  `)}
`;

const SideText = () => {
  return (
    <Container>
      <div>행복한</div>
      <div>반려생활을 위해</div>
      <div>공유하는</div>
      <div>윗펫 Pick!</div>
    </Container>
  );
};

export default SideText;
