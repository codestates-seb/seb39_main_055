import styled from "styled-components";

export const STextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px 20px;
  border: 1px solid #dbdbdb;
  border-radius: 10px;

  & > div:last-child {
    display: flex;
    justify-content: space-between;
  }
`;

export const STextArea = styled.textarea`
  width: 100%;
  min-height: 125px;
  outline: none;
  border: none;
  color: #000000;
  font-size: 16px;
  font-family: "Noto Sans KR", sans-serif;
  resize: none;

  &::placeholder {
    font-size: 16px;
    color: #dbdbdb;
  }
`;

export const SButton = styled.button`
  padding: 10px 20px;
  color: #ffffff;
  background-color: #ffc107;
  border: none;
  border-radius: 10px;
  font-size: 12px;
  font-family: "ONE-Mobile-Regular";
  transition: all 0.4s;

  &:hover {
    scale: 1.1;
  }

  &:disabled {
    color: #161616;
    background-color: #dbdbdb;

    &:hover {
      scale: 1;
    }
  }
`;

export const SCancelButton = styled.button`
  padding: 10px 20px;
  margin-right: 10px;
  color: #161616;
  background-color: #dbdbdb;
  border: none;
  border-radius: 10px;
  font-size: 12px;
  font-family: "ONE-Mobile-Regular";
  transition: all 0.4s;

  &:hover {
    scale: 1.1;
  }
`;
