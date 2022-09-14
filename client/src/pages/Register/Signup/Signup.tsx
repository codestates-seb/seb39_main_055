/* eslint-disable no-return-assign */
/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from "react";

import { Checkbox, Input } from "../../../components";
import {
  SButton,
  SButtonContainer,
  SCheckboxContainer,
  SContainer,
} from "./style";

const Signup = () => {
  const [name, setName] = useState("");
  const error = true;

  const handleCheckboxClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    document
      .querySelectorAll(`input[type=checkbox]`)
      .forEach((el: any) => (el.checked = false));

    e.target.checked = true;
    console.log(e.target.value);
  };

  return (
    <SContainer>
      <h1>회원가입</h1>
      <form>
        <Input
          label="이름"
          id="이름"
          value={name}
          isError={error}
          errorMsg="두 글자 이상 입력해주세요."
          placeholder="이름을 입력해주세요."
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="아이디"
          id="아이디"
          value={name}
          isError={error}
          errorMsg="공백없는 영문,숫자 6~20자"
          comment="공백없는 영문,숫자 6~20자"
          placeholder="아이디를 입력해주세요."
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="비밀번호"
          id="비밀번호"
          value={name}
          isError={error}
          errorMsg="공백없는 영문,숫자 6~20자"
          comment="공백없는 영문,숫자 6~20자"
          placeholder="비밀번호를 입력해주세요."
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="비밀번호 확인"
          id="비밀번호 확인"
          value={name}
          isError={error}
          errorMsg="비밀번호와 일치하는지 확인해주세요."
          placeholder="비밀번호를 다시 입력해주세요."
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="주소"
          id="주소"
          value={name}
          isError={error}
          errorMsg="주소를 입력해주세요."
          placeholder="주소를 입력해주세요."
          onChange={(e) => setName(e.target.value)}
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
