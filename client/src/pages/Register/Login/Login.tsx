import { FormEvent, useState } from "react";

import { useLogin } from "../../../apis";
import SocialLogin from "./SocialLogin";
import {
  HideSVG,
  SBox,
  SButton,
  SCheckbox,
  SForm,
  SH1,
  ShowSVG,
  SInput,
  SLink,
  SLoginButton,
  SLoginSection,
  SMiscBox,
  SPWBox,
  SSignupButton,
} from "./style";

const LoginForm = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isLoading, isSuccess, isError } = useLogin();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate({ email: userID, password });
  };

  return (
    <SForm onSubmit={handleSubmit}>
      <SInput
        id="username"
        value={userID}
        placeholder="아이디를 입력하세요"
        isError={false}
        errorMsg="아이디를 다시 확인해주세요."
        onChange={(e) => setUserID(e.target.value)}
      />
      <SPWBox>
        <SInput
          id="username"
          type={isHidden ? "password" : "text"}
          value={password}
          placeholder="비밀번호를 입력하세요"
          isError={isError}
          errorMsg="비밀번호를 다시 확인해주세요."
          onChange={(e) => setPassword(e.target.value)}
        />
        <SButton onClick={() => setIsHidden(!isHidden)}>
          {isHidden ? <HideSVG /> : <ShowSVG />}
        </SButton>
      </SPWBox>
      <SMiscBox>
        <SCheckbox
          labelName="로그인 상태 유지"
          value=""
          defaultChecked={false}
          id="preserve-Login"
          onChange={() => console.log("g")}
        />
        <SLink to="/">아이디/비밀번호찾기</SLink>
      </SMiscBox>

      <SLoginButton isPending={isLoading}>로그인</SLoginButton>
    </SForm>
  );
};

const Login = () => {
  return (
    <SBox>
      <SH1>로그인</SH1>
      <SLoginSection>
        <LoginForm />
        <SSignupButton>회원가입</SSignupButton>
        <SocialLogin />
      </SLoginSection>
    </SBox>
  );
};

export default Login;
