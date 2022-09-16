import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { mutate, isLoading, isSuccess, isError, errMsg } = useLogin();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate({ email, password, keepLoggedIn });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/", { replace: true });
    }
  }, [isSuccess, navigate]);

  return (
    <SForm onSubmit={handleSubmit}>
      <SInput
        id="username"
        value={email}
        placeholder="아이디를 입력하세요"
        isError={false}
        errorMsg=""
        onChange={(e) => setEmail(e.target.value)}
      />
      <SPWBox>
        <SInput
          id="username"
          type={isHidden ? "password" : "text"}
          value={password}
          placeholder="비밀번호를 입력하세요"
          isError={isError}
          errorMsg={errMsg}
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
          defaultChecked={keepLoggedIn}
          id="preserve-Login"
          onChange={() => setKeepLoggedIn((prev) => !prev)}
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
