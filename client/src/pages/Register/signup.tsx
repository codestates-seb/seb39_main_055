/* eslint-disable no-return-assign */
/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from "react";
import styled from "styled-components";

import { ButtonOrange, Checkbox, Input } from "../../components";

export const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  min-height: calc(100vh - 380px);

  & > h1 {
    font-size: 42px;
  }

  & > form {
    display: flex;
    flex-direction: column;
    gap: 60px;
    width: 50%;
    padding: 60px;
    box-shadow: 0px 0px 5px grey;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.tablet}) {
    & > form {
      gap: 50px;
      width: 80%;
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.mobile}) {
    margin: 50px 0;

    & > h1 {
      font-size: 21px;
    }

    & > form {
      padding: 25px;
    }
  }
`;

export const SCheckboxContainer = styled.div`
  display: flex;
  align-items: center;

  & > span {
    flex-basis: 30%;
    color: #464646;
    font-size: 16px;
    cursor: pointer;
  }

  & > section {
    display: flex;
    gap: 30px;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    & > section {
      width: 100%;
      justify-content: space-between;
    }
  }
`;

export const SButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const SButton = styled(ButtonOrange)`
  width: 80%;

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.tablet}) {
    width: 100%;
  }
`;

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
