import "react-datepicker/dist/react-datepicker.css";

import { ko } from "date-fns/esm/locale";
import { useState } from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";

export const SContainer = styled.div`
  display: flex;
  align-items: center;

  & > span {
    flex-basis: 30%;
    color: #161616;
    font-size: 18px;
    cursor: pointer;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
`;

export const SInputContainer = styled.div`
  flex-basis: 70%;
  border-bottom: 1px solid #dbdbdb;
  position: relative;

  .input-datepicker {
    width: 100%;
    padding: 5px;
    border: none;
    font-size: 16px;
    outline: none;
    overflow: auto;
  }

  .input-datepicker::placeholder {
    font-size: 16px;
    color: #767676;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.tablet}) {
    width: 100%;

    & > input {
      padding: 5px 0;
    }
  }
`;

export const SError = styled.p<{ isError: boolean }>`
  display: ${({ isError }) => (isError ? "block" : "none")};
  position: absolute;
  top: 35px;
  left: 5px;
  color: #f53a3a;
  font-size: 12px;

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.tablet}) {
    left: 0;
  }
`;

interface Prop {
  setValue: React.Dispatch<
    React.SetStateAction<{
      value: string;
      isError: boolean;
    }>
  >;
  isError: boolean;
}

const CustomCalendat = ({ isError, setValue }: Prop) => {
  const [startDate, setStartDate] = useState<null | Date>(null);

  const handleDateClick = (date: Date) => {
    const convertDate = new Date(`${date}Z`)
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, "");

    setStartDate(date);
    setValue({
      value: convertDate,
      isError: false,
    });
  };

  return (
    <SContainer>
      <span>개업 일자</span>
      <SInputContainer>
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => handleDateClick(date)}
          locale={ko}
          closeOnScroll
          className="input-datepicker"
          placeholderText="개업 일자를 입력해주세요."
          dateFormat="yyyy-MM-dd"
          useWeekdaysShort
        />
        {isError && (
          <SError isError={isError}>개업 일자를 입력해주세요.</SError>
        )}
      </SInputContainer>
    </SContainer>
  );
};

export default CustomCalendat;
