import { useEffect, useState } from "react";
import styled from "styled-components";

import { LoginModal, useModal } from "../../../../components";
import { useAppSelector } from "../../../../redux";

export const STextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px 20px;
  border: 1px solid #dbdbdb;
  border-radius: 10px;

  & > div:last-child {
    display: flex;
    justify-content: end;
  }
`;

export const STextArea = styled.textarea`
  width: 100%;
  min-height: 125px;
  outline: none;
  border: none;
  color: #000000;
  font-size: 16px;
  font-family: "ONE-Mobile-Regular";
  line-height: 30px;
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

interface Prop {
  isEdit: boolean;
  setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>;
  body?: string;
  submitCallback: (body: string) => void;
}

const PostForm = ({ isEdit, setIsEdit, body = "", submitCallback }: Prop) => {
  const [validate, setValidate] = useState(false);
  const [replyValue, setReplyValue] = useState(body);
  const { loginStatus } = useAppSelector((state) => state.user);
  const { openModal } = useModal();

  const handleFocus = () => {
    if (!loginStatus) {
      openModal(<LoginModal />);
    }
  };

  const handleSubmit = () => {
    submitCallback(replyValue);
    setReplyValue("");
  };

  useEffect(() => {
    if (loginStatus && replyValue.trim().length > 0) {
      setValidate(false);
    } else {
      setValidate(true);
    }
  }, [loginStatus, replyValue]);

  return (
    <STextAreaContainer>
      <STextArea
        placeholder="리뷰를 작성해주세요."
        value={replyValue}
        onFocus={handleFocus}
        onChange={(e) => setReplyValue(e.target.value)}
      />
      <div>
        {isEdit && setIsEdit && (
          <SCancelButton onClick={() => setIsEdit(false)}>취소</SCancelButton>
        )}
        <SButton disabled={validate} onClick={handleSubmit}>
          입력
        </SButton>
      </div>
    </STextAreaContainer>
  );
};

export default PostForm;
