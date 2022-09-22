import { FormEvent, useState } from "react";

import useLogin from "../../../apis/user/login";
import { useRedirect } from "../../../hooks";
import { emailValidation, notBlank, passwordValidation } from "../../../utils";
import PreviewImages from "../../Posts/PreviewImages";
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
  const [inputErrors, setInputErrors] = useState({
    email: false,
    password: false,
  });
  const { mutate, isLoading, isSuccess, isError, errMsg } = useLogin();

  useRedirect({ redirect: isSuccess, replace: true });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const invalidPW = !notBlank(password);
    const invalidEmail = !emailValidation(email);
    console.log(inputErrors);
    if (invalidPW || invalidEmail) {
      setInputErrors({ email: invalidEmail, password: invalidPW });
      return;
    }
    console.log("wjsthd");
    setInputErrors({ email: false, password: false });
    mutate({ email, password, keepLoggedIn });
  };

  return (
    <SForm onSubmit={handleSubmit}>
      <SInput
        id="username"
        value={email}
        placeholder="이메일을 입력하세요"
        isError={isError && !emailValidation(email)}
        errorMsg="유효하지 않은 이메일"
        onChange={(e) => setEmail(e.target.value)}
      />
      <SPWBox>
        <SInput
          id="username"
          type={isHidden ? "password" : "text"}
          value={password}
          placeholder="비밀번호를 입력하세요"
          isError={isError && !passwordValidation(password)}
          errorMsg={errMsg}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SButton type="button" onClick={(e) => setIsHidden(!isHidden)}>
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
        <SocialLogin />
        <SSignupButton>회원가입</SSignupButton>
      </SLoginSection>
    </SBox>
  );
};

export default Login;
