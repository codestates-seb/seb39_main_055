import styled, { css } from "styled-components";

import { mobile } from "../../../assets";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  width: 300px;
  text-decoration: underline;
  text-underline-position: under;
  text-decoration-thickness: 1px;
  gap: 20px;
  font-family: ONE Mobile;
  font-weight: 400;
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.black500};

  ${mobile(css`
    flex-direction: row;
    flex-wrap: wrap;
    font-size: 30px;
    text-decoration: none;
    gap: 5px;
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
