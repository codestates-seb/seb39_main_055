/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-return-assign */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useNewPlace } from "../../../apis";
import {
  Checkbox,
  FileInput,
  Input,
  SearchAddress,
  TextArea,
} from "../../../components";
import PreviewImages from "../../../components/PostForms/PreviewImages/PreviewImages";
import { useCheckbox, useValidate } from "../../../hooks";
import { ThreadImages } from "../../../types";
import {
  descriptionValidation,
  notBlank,
  phoneNumberValidation,
  urlValidation,
} from "../../../utils";
import { SButton, SCheckboxContainer, SContainer, SForm } from "./style";

const NewPlace = () => {
  const navigate = useNavigate();
  const { checkboxValue, handleCheckboxClick } = useCheckbox("숙소");
  const [nameValue, nameError, handleName, checkName] = useValidate(notBlank);
  const [homePageValue, homePageError, handleHomePage, checkHomePage] =
    useValidate(urlValidation);
  const [
    addressValue,
    addressError,
    handleAddress,
    checkAddress,
    setAddressValue,
    setAddressError,
  ] = useValidate(notBlank);
  const [
    registrationValue,
    registrationError,
    handleRegistration,
    checkRegistration,
  ] = useValidate(notBlank);
  const [
    phoneNumberValue,
    phoneNumberError,
    handlePhoneNumber,
    checkPhoneNumber,
  ] = useValidate(phoneNumberValidation);
  const [
    descriptionValue,
    descriptionError,
    handleDescription,
    checkDescription,
  ] = useValidate(descriptionValidation);

  const [images, setImages] = useState<ThreadImages[]>([]);
  const [defaultId, setDefaultId] = useState("0");

  const { refetch, isSuccess } = useNewPlace({
    category: checkboxValue,
    addressName: addressValue,
    body: descriptionValue,
    storeName: nameValue,
    phone: phoneNumberValue,
    homepage: homePageValue,
    storeImages: images,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    checkName();
    checkRegistration();
    checkAddress();
    checkPhoneNumber();
    checkHomePage();
    checkDescription();

    if (
      !notBlank(nameValue) ||
      !notBlank(addressValue) ||
      !notBlank(registrationValue) ||
      !phoneNumberValidation(phoneNumberValue) ||
      !urlValidation(homePageValue) ||
      !descriptionValidation(descriptionValue)
    )
      return;

    refetch();
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/"); // list 페이지 구현되면 수정
    }
  }, [isSuccess, navigate, images]);

  return (
    <SContainer>
      <h1>매장 등록</h1>
      <SForm onSubmit={handleSubmit}>
        <section>
          <PreviewImages
            images={images}
            setImages={setImages}
            defaultId={defaultId}
            setDefaultId={setDefaultId}
          />
        </section>
        <section>
          <Input
            label="매장명"
            id="매장명"
            value={nameValue}
            isError={nameError}
            errorMsg="매장명을 입력해주세요."
            placeholder="매장명을 입력해주세요."
            onChange={(e) => handleName(e)}
          />
          <SCheckboxContainer>
            <span>카테고리</span>
            <section>
              {["숙소", "미용", "카페", "맛집", "운동장", "동물병원"].map(
                (el, idx) => (
                  <Checkbox
                    key={el}
                    id={el}
                    value={el}
                    labelName={el}
                    defaultChecked={idx === 0}
                    onChange={(e) => handleCheckboxClick(e)}
                  />
                )
              )}
            </section>
          </SCheckboxContainer>
          <Input
            label="사업자 등록증"
            id="사업자 등록증"
            value={registrationValue}
            isError={registrationError}
            errorMsg="사업자 등록증을 첨부해주세요."
            placeholder="사업자 등록증을 첨부해주세요."
            onChange={(e) => handleRegistration(e)}
            readOnly
            sideButton={
              <FileInput
                id="사업자등록증"
                label="파일 첨부"
                onChange={(e) => handleRegistration(e)}
              />
            }
          />
          <Input
            label="주소"
            id="주소"
            value={addressValue}
            isError={addressError}
            errorMsg="주소를 입력해주세요."
            placeholder="주소를 입력해주세요."
            sideButton={
              <SearchAddress
                setValue={setAddressValue}
                setError={setAddressError}
              />
            }
            readOnly
            onChange={(e) => handleAddress(e)}
          />
          <Input
            label="전화번호"
            id="전화번호"
            type="tel"
            value={phoneNumberValue}
            isError={phoneNumberError}
            errorMsg="'000-0000-0000' 형식으로 입력해주세요"
            placeholder="매장 전화번호를 입력해주세요."
            comment="'000-0000-0000' 형식으로 입력해주세요"
            onChange={(e) => handlePhoneNumber(e)}
          />
          <Input
            label="홈페이지 주소"
            id="홈페이지 주소"
            value={homePageValue}
            isError={homePageError}
            errorMsg="유효한 홈페이지 주소인지 확인해주세요."
            placeholder="매장 홈페이지 주소를 입력해주세요."
            onChange={(e) => handleHomePage(e)}
          />
          <TextArea
            id="매장 상세설명"
            label="매장 상세설명"
            value={descriptionValue}
            isError={descriptionError}
            errorMsg="매장 상세 설명을 20자 이상 입력해주세요."
            placeholder="매장에 대한 설명을 입력해주세요."
            onChange={(e) => handleDescription(e)}
          />
          <SButton>등록하기</SButton>
        </section>
      </SForm>
    </SContainer>
  );
};

export default NewPlace;
