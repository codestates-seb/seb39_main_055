import { useState } from "react";
import styled from "styled-components";

import { ButtonOrange, CustomCalendar, Input } from "../../../components";
import { useValidate } from "../../../hooks";
import { businessNumberValidation, notBlank } from "../../../utils";

export const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 100px 0;
  min-height: calc(100vh - 380px);

  & > h1 {
    margin-bottom: 64px;
    color: #161616;
    font-size: 32px;
  }

  & > form {
    display: flex;
    flex-direction: column;
    gap: 60px;
    width: 100%;
    max-width: 660px;
    padding: 100px 60px;
    border: 1px solid #dbdbdb;
    border-radius: 0 0 10px 10px;
    font-family: "Noto Sans KR", sans-serif;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.tablet}) {
    & > div {
      width: 90%;
    }

    & > form {
      width: 90%;
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

export const SButtonContainer = styled.section`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Business = () => {
  const [nameValue, nameError, handleName, checkName] = useValidate(notBlank);
  const [
    businessNumberValue,
    businessNumberError,
    handleBusinessNumber,
    checkBusinessNumber,
  ] = useValidate(businessNumberValidation);

  const [date, setDate] = useState({
    value: "",
    isError: false,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    checkName();
    checkBusinessNumber();
    if (!notBlank(date.value)) {
      setDate((prev) => {
        return { ...prev, isError: true };
      });
    }

    if (
      !notBlank(nameValue) ||
      !businessNumberValidation(businessNumberValue) ||
      !notBlank(date.value)
    ) {
      return;
    }

    console.log(nameValue, businessNumberValue, date.value);
  };

  return (
    <SContainer>
      <h1>사업자 등록</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Input
          label="대표자 성명"
          id="대표자 성명"
          value={nameValue}
          isError={nameError}
          errorMsg="대표자 성명을 입력해주세요."
          placeholder="대표자 성명을 입력해주세요."
          onChange={(e) => handleName(e)}
        />
        <CustomCalendar setValue={setDate} isError={date.isError} />
        <Input
          label="사업자 등록 번호"
          id="사업자 등록 번호"
          type="tel"
          value={businessNumberValue}
          isError={businessNumberError}
          errorMsg="특수문자를 제외한 10자리 등록 번호를 입력해주세요."
          placeholder="특수문자를 제외한 10자리 등록 번호를 입력해주세요."
          onChange={(e) => handleBusinessNumber(e)}
        />
        <SButtonContainer>
          <ButtonOrange>등록</ButtonOrange>
        </SButtonContainer>
      </form>
    </SContainer>
  );
};

export default Business;
