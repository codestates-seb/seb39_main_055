/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from "react";
import styled from "styled-components";

import { Input } from "../../components/Form";

export const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: calc(100vh - 380px);

  & > h1 {
    font-size: 42px;
  }

  & > form {
    display: flex;
    flex-direction: column;
    gap: 60px;
    width: 50%;
    padding: 40px;
    box-shadow: 0px 0px 5px grey;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.tablet}) {
    & > form {
      gap: 50px;
      width: 80%;
    }
  }
`;

const Signup = () => {
  const [name, setName] = useState("");
  const error = true;
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
          // label="비밀번호 확인"
          id="비밀번호 확인"
          value={name}
          isError={error}
          errorMsg="비밀번호와 일치하는지 확인해주세요."
          placeholder="비밀번호를 다시 입력해주세요."
          onChange={(e) => setName(e.target.value)}
        />
      </form>
    </SContainer>
  );
};

export default Signup;
