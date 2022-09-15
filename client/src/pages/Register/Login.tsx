import { type } from "@testing-library/user-event/dist/type";
import { FormEvent, useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import styled, { css } from "styled-components";

import { colors } from "../../assets";
import { ButtonOrange, ButtonWhite, Input } from "../../components/Form";

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
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  width: 450px;
  height: 700px;
  padding: 50px;
  border: 1px solid ${colors("black050")};
`;

const SForm = styled.form`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  height: 300px;
  width: 100%;
  row-gap: 35px;
`;

const SIDInput = styled(Input)`
  width: 100%;
  height: 40px;

  & > div {
    height: 100%;
  }

  & input {
    height: 100%;
    font-size: 16px;

    &::placeholder {
      font-size: 16px;
    }
  }
`;

const SPWBox = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
`;

const SPWInput = styled(SIDInput)``;

const SButton = styled.button`
  width: 60px;
  height: 22px;
  position: absolute;
  top: 50%;
  right: -30px;
  transform: translate(-50%, -52%);
  border: 0px;
  padding: 0px;
  background-color: rgba(0, 0, 0, 0);
`;

const IconDefault = css`
  width: 100%;
  height: 100%;
  fill: rgba(0, 0, 0, 0);
  transition: 0.4s all;
  padding: 0px 20px 0px 10px;

  &:hover {
    fill: ${colors("black250")};
    background-color: white;
  }
`;

const ShowSVG = styled(BiShow)`
  ${IconDefault}
`;
const HideSVG = styled(BiHide)`
  ${IconDefault}
`;

const LoginForm = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <SForm onSubmit={handleSubmit}>
      <SIDInput
        id="username"
        value={userID}
        placeholder="아이디를 입력하세요"
        isError={false}
        errorMsg="아이디를 다시 확인해주세요."
        onChange={(e) => setUserID(e.target.value)}
      />
      <SPWBox>
        <SIDInput
          id="username"
          type={isHidden ? "password" : "text"}
          value={password}
          placeholder="비밀번호를 입력하세요"
          isError={false}
          errorMsg="비밀번호를 다시 확인해주세요."
          onChange={(e) => setPassword(e.target.value)}
        />
        <SButton onClick={() => setIsHidden(!isHidden)}>
          {isHidden ? <HideSVG /> : <ShowSVG />}
        </SButton>
      </SPWBox>

      <ButtonOrange>로그인</ButtonOrange>
    </SForm>
  );
};

const Login = () => {
  return (
    <SBox>
      <SH1>로그인</SH1>
      <SLoginSection>
        <LoginForm />
        <ButtonWhite>회원가입</ButtonWhite>
      </SLoginSection>
    </SBox>
  );
};

export default Login;
