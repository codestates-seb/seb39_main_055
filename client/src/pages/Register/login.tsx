import styled from "styled-components";

import { colors } from "../../assets";
import { Button, ButtonOrange, ButtonWhite } from "../../components/Form";

const SBox = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  height: 1000px;
`;

const SH1 = styled.h1`
  font-size: 42px;
  padding: 10px;
`;

const SLoginSection = styled.section`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 500px;
  height: 700px;
  border: 1px solid ${colors("black050")};
`;

const SInButton = styled(Button)`
  width: 350px;
`;

const SUpButton = styled(SInButton)`
  border: 1px solid ${colors("black050")};
`;

const login = () => {
  return (
    <SBox>
      <SH1>로그인</SH1>
      <SLoginSection>
        <ButtonOrange>로그인</ButtonOrange>
        <ButtonWhite>회원가입</ButtonWhite>
      </SLoginSection>
    </SBox>
  );
};

export default login;
