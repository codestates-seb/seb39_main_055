import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { businessValidate, changeUserRole } from "../../../apis";
import {
  ButtonOrange,
  CustomCalendar,
  ErrorModal,
  Input,
  useModal,
} from "../../../components";
import { useValidate } from "../../../hooks";
import { businessNumberValidation, notBlank } from "../../../utils";
import { SButtonContainer, SContainer } from "./style";

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

    businessValidateMutate({
      owner: nameValue,
      openDate: date.value,
      businessNumber: businessNumberValue,
    });
  };

  const { openModal } = useModal();
  const navigate = useNavigate();

  const { mutate: businessValidateMutate } = useMutation(businessValidate, {
    onSuccess: async (data) => {
      if (data.data[0].valid === "02") {
        openModal(<ErrorModal body="유효하지 않은 사업자 입니다." />);
        return;
      }
      changeUserRoleMutate();
    },
  });

  const { mutate: changeUserRoleMutate } = useMutation(changeUserRole, {
    onSuccess: (data) => {
      toast.success("사업자 등록이 완료되었습니다. 다시 로그인 해주세요.");
      navigate("/login");
    },
  });

  return (
    <SContainer>
      <h1>사업자 등록</h1>
      <p>사업자 등록 시 매장 등록이 가능합니다.</p>
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
