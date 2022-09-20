/* eslint-disable no-return-assign */
/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/label-has-associated-control */

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useSignup } from "../../../apis/user/signup";
import { Checkbox, Input, SearchAddress } from "../../../components";
import { useCheckbox, useValidate } from "../../../hooks";
import {
  emailValidation,
  nickNameValidation,
  notBlank,
  passwordCheckValidation,
  passwordValidation,
} from "../../../utils/validation";
import {
  SButton,
  SButtonContainer,
  SCheckboxContainer,
  SContainer,
} from "./style";

const Signup = () => {
  const navigate = useNavigate();
  const { checkboxValue, handleCheckboxClick } = useCheckbox();
  const [nameValue, nameError, handleName, checkName] =
    useValidate(nickNameValidation);
  const [emailValue, emailError, handleEmail, checkEmail] =
    useValidate(emailValidation);
  const [
    addressValue,
    addressError,
    handleAddress,
    checkAddress,
    setAddressValue,
    setAddressError,
  ] = useValidate(notBlank);
  const [passwordValue, passwordError, handlePassword, checkPassword] =
    useValidate(passwordValidation);
  const [
    passwordCheckValue,
    passwordCheckError,
    handlePasswordCheck,
    checkPasswordCheck,
  ] = useValidate(
    passwordCheckValidation as (value: string, password?: string) => boolean
  );
  const { refetch, isSuccess } = useSignup(addressValue, {
    email: emailValue,
    password: passwordValue,
    nickname: nameValue,
    userRole: checkboxValue,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    checkName();
    checkEmail();
    checkPassword();
    checkPasswordCheck(passwordValue);
    checkAddress();

    if (
      !nickNameValidation(nameValue) ||
      !emailValidation(emailValue) ||
      !passwordValidation(passwordValue) ||
      !passwordCheckValidation(passwordCheckValue, passwordValue) ||
      !notBlank(addressValue)
    ) {
      return;
    }

    refetch();
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
      toast.success("회원가입을 축하드립니다 ! 로그인 해주세요.");
    }
  }, [isSuccess, navigate]);

  return (
    <SContainer>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="이름"
          id="이름"
          value={nameValue}
          isError={nameError}
          errorMsg="두 글자 이상 입력해주세요."
          placeholder="이름을 입력해주세요."
          onChange={(e) => handleName(e)}
        />
        <Input
          label="이메일"
          id="이메일"
          value={emailValue}
          isError={emailError}
          errorMsg="이메일 형식을 확인해주세요."
          placeholder="이메일을 입력해주세요."
          onChange={(e) => handleEmail(e)}
        />
        <Input
          type="password"
          label="비밀번호"
          id="비밀번호"
          value={passwordValue}
          isError={passwordError}
          errorMsg="공백없는 영문,숫자 6~20자"
          comment="공백없는 영문,숫자 6~20자"
          placeholder="비밀번호를 입력해주세요."
          onChange={(e) => handlePassword(e)}
        />
        <Input
          type="password"
          label="비밀번호 확인"
          id="비밀번호 확인"
          value={passwordCheckValue}
          isError={passwordCheckError}
          errorMsg="비밀번호와 일치하는지 확인해주세요."
          placeholder="비밀번호를 다시 입력해주세요."
          onChange={(e) => handlePasswordCheck(e, passwordValue)}
        />
        <Input
          label="주소"
          id="주소"
          value={addressValue}
          isError={addressError}
          errorMsg="주소를 입력해주세요."
          placeholder="주소를 입력해주세요."
          sideButton={
            <SearchAddress
              setValue={setAddressValue}
              setError={setAddressError}
            />
          }
          readOnly
          onChange={(e) => handleAddress(e)}
        />
        <SCheckboxContainer>
          <span>회원 구분</span>
          <section>
            {["일반 회원", "기업 회원"].map((el, idx) => {
              const value = el === "기업 회원" ? "ROLE_OWNER" : "ROLE_USER";
              return (
                <Checkbox
                  key={el}
                  id={el}
                  value={value}
                  labelName={el}
                  defaultChecked={idx === 1}
                  onChange={(e) => handleCheckboxClick(e)}
                />
              );
            })}
          </section>
        </SCheckboxContainer>
        <SButtonContainer>
          <SButton>회원가입</SButton>
        </SButtonContainer>
      </form>
    </SContainer>
  );
};

export default Signup;
