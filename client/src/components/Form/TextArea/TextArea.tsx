/* eslint-disable jsx-a11y/label-has-associated-control */
import styled from "styled-components";

export const STextAreaContainer = styled.div`
  display: flex;

  & > label {
    flex-basis: 30%;
    color: #161616;
    font-size: 18px;
    cursor: pointer;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 25px;

    & > section > label {
      flex-basis: 5%;
    }
  }
`;

export const STextArea = styled.section`
  width: 100%;
  height: auto;
  flex-basis: 70%;

  & > textarea {
    position: relative;
    width: 100%;
    height: 300px;
    padding: 10px;
    outline: none;
    border: 1px solid #dbdbdb;
    color: #000000;
    font-size: 16px;
    font-family: "Noto Sans KR", sans-serif;
    resize: none;

    &::placeholder {
      font-size: 16px;
      color: #767676;
    }
  }

  & > p {
    margin-top: 5px;
    color: #f53a3a;
    font-size: 12px;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.tablet}) {
    & > textarea {
      flex-basis: 95%;
    }
  }
`;

interface Prop {
  label: string;
  id: string;
  value: string;
  isError: boolean;
  errorMsg: string;
  placeholder: string;
  onChange: (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => void | React.Dispatch<React.SetStateAction<string>>;
}

const TextArea = ({
  label,
  id,
  value,
  isError,
  errorMsg,
  placeholder,
  onChange,
}: Prop) => {
  return (
    <STextAreaContainer>
      <label htmlFor={id}>{label}</label>
      <STextArea>
        <textarea
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e)}
        />
        {isError && <p>{errorMsg}</p>}
      </STextArea>
    </STextAreaContainer>
  );
};

export default TextArea;
