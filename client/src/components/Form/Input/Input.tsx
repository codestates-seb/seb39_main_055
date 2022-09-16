/* eslint-disable jsx-a11y/label-has-associated-control */
import styled from "styled-components";

export const SInputContainer = styled.div`
  display: flex;
  align-items: center;

  & > label {
    flex-basis: 30%;
    color: #464646;
    font-size: 16px;
    cursor: pointer;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
`;

export const SInput = styled.div<{
  isLabel: string | undefined;
  isSideButton: JSX.Element | undefined;
}>`
  position: relative;
  flex-basis: ${({ isLabel }) => (isLabel ? "70%" : "100%")};
  border-bottom: 1px solid #dbdbdb;

  & > input {
    width: ${({ isSideButton }) => (isSideButton ? "70%" : "100%")};
    /* width: 100%; */
    padding: 5px;
    border: none;
    outline: none;
    overflow: auto;
  }

  & > input::placeholder {
    color: #767676;
  }

  & > button {
    position: absolute;
    right: 0;
    bottom: 5px;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.tablet}) {
    width: 100%;

    & > input {
      padding: 5px 0;
      width: ${({ isSideButton }) => (isSideButton ? "70%" : "100%")};
    }
  }
`;

export const SError = styled.p<{ isError: boolean }>`
  display: ${({ isError }) => (isError ? "block" : "none")};
  position: absolute;
  top: 35px;
  left: 5px;
  color: red;
  font-size: 10px;

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.tablet}) {
    left: 0;
  }
`;

export const SComment = styled.p<{ isError: boolean }>`
  display: ${({ isError }) => (isError ? "none" : "block")};
  position: absolute;
  top: 35px;
  left: 5px;
  color: #767676;
  font-size: 10px;

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.tablet}) {
    left: 0;
  }
`;

interface Prop {
  type?: "password" | "text";
  label?: string;
  id: string;
  value: string;
  isError: boolean;
  errorMsg: string;
  comment?: string;
  placeholder: string;
  className?: string;
  sideButton?: JSX.Element;
  readOnly?: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void | React.Dispatch<React.SetStateAction<string>>;
}

const Input = ({
  type = "text",
  label,
  id,
  value,
  isError,
  errorMsg,
  comment,
  placeholder,
  className,
  sideButton,
  readOnly,
  onChange,
}: Prop) => {
  return (
    <SInputContainer className={className}>
      {label && <label htmlFor={id}>{label}</label>}
      <SInput isLabel={label} isSideButton={sideButton}>
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          readOnly={readOnly}
          onChange={(e) => onChange(e)}
        />
        {isError && <SError isError={isError}>{errorMsg}</SError>}
        {!isError && comment && (
          <SComment isError={isError}>{comment}</SComment>
        )}
        {sideButton}
      </SInput>
    </SInputContainer>
  );
};

export default Input;
