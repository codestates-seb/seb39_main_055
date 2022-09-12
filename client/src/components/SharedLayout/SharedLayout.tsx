import { Outlet } from "react-router-dom";
import styled from "styled-components";

const SNav = styled.nav`
  height: 50px;
  border: 1px solid black;
`;

const SSection = styled.section`
  height: calc(100vh - 350px);
`;

const SFooter = styled.footer`
  height: 300px;
  border: 1px solid black;
  font-family: var(--font-noto);
`;

const SharedLayout = () => {
  return (
    <>
      <SNav>오늘의 추천 플레이스</SNav>
      <SSection>
        <Outlet />
      </SSection>
      <SFooter>나의 반려동물과 함께 잊지못할 추억을 쌓아보세요.</SFooter>
    </>
  );
};

export default SharedLayout;
