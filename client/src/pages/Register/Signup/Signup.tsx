/* eslint-disable no-return-assign */
/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from "react";

import { Checkbox, Input } from "../../../components";
import { useValidate } from "../../../hooks";
import {
  idValidation,
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
  const [nameValue, nameError, handleName, checkName] =
    useValidate(nickNameValidation);
  const [idValue, idError, handleId, checkId] = useValidate(idValidation);
  const [addressValue, addressError, handleAddress, checkAddress] =
    useValidate(notBlank);
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
  const [isGuest, setIsGuest] = useState(true);

  const handleCheckboxClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    document
      .querySelectorAll(`input[type=checkbox]`)
      .forEach((el: any) => (el.checked = false));

    const { target } = e;
    target.checked = true;
    if (target.value === "업주 등록") setIsGuest(false);
    if (target.value === "업주 미등록") setIsGuest(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    checkName();
    checkId();
    checkPassword();
    checkPasswordCheck(passwordValue);
    checkAddress();

    if (
      !nickNameValidation(nameValue) ||
      !idValidation(idValue) ||
      !passwordValidation(passwordValue) ||
      !passwordCheckValidation(passwordCheckValue, passwordValue) ||
      !notBlank(addressValue)
    ) {
      return;
    }

    console.log({
      nickname: nameValue,
      email: idValue,
      password: passwordValue,
      longitude: 111,
      latitude: 111,
      isGuest,
    });
  };

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
          label="아이디"
          id="아이디"
          value={idValue}
          isError={idError}
          errorMsg="공백없는 영문,숫자 6~20자"
          comment="공백없는 영문,숫자 6~20자"
          placeholder="아이디를 입력해주세요."
          onChange={(e) => handleId(e)}
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
          onChange={(e) => handleAddress(e)}
        />
        <SCheckboxContainer>
          <span>업주 등록</span>
          <section>
            {["업주 등록", "업주 미등록"].map((el, idx) => (
              <Checkbox
                key={el}
                id={el}
                value={el}
                labelName={el}
                defaultChecked={idx === 1}
                onChange={(e) => handleCheckboxClick(e)}
              />
            ))}
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
