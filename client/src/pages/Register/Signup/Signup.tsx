/* eslint-disable no-return-assign */
/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/label-has-associated-control */

import { useRef, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { signupUser } from "../../../apis/user/signup";
import defaultImg from "../../../assets/images/mypage/user.png";
import { Input, PreviewImage } from "../../../components";
import { useValidate } from "../../../hooks";
import { ThreadImages } from "../../../types/threads";
import {
  emailValidation,
  nickNameValidation,
  passwordValidation,
} from "../../../utils/validation";
import {
  HideSVG,
  SButton,
  SButtonContainer,
  SContainer,
  SHideButton,
  ShowSVG,
  SPWBox,
} from "./style";

const Signup = () => {
  const navigate = useNavigate();
  const imgFile = useRef<ThreadImages | string>(defaultImg);
  const [isHidden, setIsHidden] = useState(true);
  const [profileImg, setProfileImg] = useState<string | ArrayBuffer | null>(
    defaultImg
  );
  const [nameValue, nameError, handleName, checkName] =
    useValidate(nickNameValidation);
  const [emailValue, emailError, handleEmail, checkEmail] =
    useValidate(emailValidation);
  const [passwordValue, passwordError, handlePassword, checkPassword] =
    useValidate(passwordValidation);

  const { mutate } = useMutation(signupUser, {
    onSuccess: () => {
      toast.success("회원가입을 축하합니다 !");
      navigate("/login");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    checkName();
    checkEmail();
    checkPassword();

    if (
      !nickNameValidation(nameValue) ||
      !emailValidation(emailValue) ||
      !passwordValidation(passwordValue)
    ) {
      return;
    }

    mutate({
      nickname: nameValue,
      email: emailValue,
      password: passwordValue,
      image: imgFile.current,
    });
  };

  return (
    <SContainer>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <PreviewImage
          id="프로필사진"
          label="사진 변경"
          imgUrl={profileImg as string}
          setImgUrl={setProfileImg}
          imgFile={imgFile}
        />
        <Input
          label="닉네임"
          id="닉네임"
          value={nameValue}
          isError={nameError}
          errorMsg="두 글자 이상 입력해주세요."
          placeholder="닉네임을 입력해주세요."
          onChange={(e) => handleName(e)}
        />
        <Input
          label="이메일"
          id="이메일"
          value={emailValue}
          isError={emailError}
          errorMsg="이메일 형식을 확인해주세요."
          placeholder="이메일을 입력해주세요."
          onChange={(e) => handleEmail(e)}
        />
        <SPWBox>
          <Input
            type={isHidden ? "password" : "text"}
            label="비밀번호"
            id="비밀번호"
            value={passwordValue}
            isError={passwordError}
            errorMsg="공백없는 영문,숫자 6~20자"
            comment="공백없는 영문,숫자 6~20자"
            placeholder="비밀번호를 입력해주세요."
            onChange={(e) => handlePassword(e)}
          />
          <SHideButton type="button" onClick={() => setIsHidden(!isHidden)}>
            {isHidden ? <HideSVG /> : <ShowSVG />}
          </SHideButton>
        </SPWBox>
        <SButtonContainer>
          <SButton>회원가입</SButton>
        </SButtonContainer>
      </form>
    </SContainer>
  );
};

export default Signup;
