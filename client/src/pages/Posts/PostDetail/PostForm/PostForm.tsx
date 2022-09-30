import { useEffect, useState } from "react";

import { ErrorModal, LoginModal, useModal } from "../../../../components";
import { useAppSelector } from "../../../../redux";
import { SButton, SCancelButton, STextArea, STextAreaContainer } from "./style";

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
    if (isEdit && body === replyValue) {
      openModal(<ErrorModal body="변경된 내용이 없습니다." />);
      return;
    }

    submitCallback(replyValue.trim());
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
        placeholder="다양한 이야기를 공유해주세요 :)"
        value={replyValue}
        onFocus={handleFocus}
        onChange={(e) => setReplyValue(e.target.value)}
      />
      <div>
        {isEdit && setIsEdit && (
          <SCancelButton onClick={() => setIsEdit(false)}>취소</SCancelButton>
        )}
        <SButton disabled={validate} onClick={handleSubmit}>
          {isEdit ? "수정" : "입력"}
        </SButton>
      </div>
    </STextAreaContainer>
  );
};

export default PostForm;
