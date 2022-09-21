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
  ImgPreview,
  Input,
  SearchAddress,
  TextArea,
} from "../../../components";
import { useCheckbox, useValidate } from "../../../hooks";
import {
  descriptionValidation,
  notBlank,
  phoneNumberValidation,
  urlValidation,
} from "../../../utils";
import { SButton, SCheckboxContainer, SContainer, SForm } from "./style";

const noImageUrl =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHUAAAB1CAMAAABH2l6OAAAAMFBMVEW7u7vz8/PCwsK+vr7V1dX29vbv7+/Gxsa4uLjMzMzh4eH5+fnc3NzJycns7Oy1tbXhfB7JAAABWElEQVRoge2X2Y6EIBBFRSgplsH//9vBNdK2iU6umZd7XrobOzlSVBXQdYQQQgghhBBCCCGEkLfon6EIp0YxT5CI0NpHTlNf0SKsg2R7Fc3TA5tlgFiN8Zcx00o74FFW8ZdSH0tuh96w2mZmGpKIDG9bfSpNtMucP+44hLdqmQqj2yV2qaly/Dvcqm6yiLhRt0cz8d257iUZxuU1cqq/UpNsaOuY9yYl6/JqlmRCk2Fgq/Zt35vTWbv14y3rGD96n9tl6tzeLLBW/fncBGTYYutFSli9WOs4fOn0y/JqkZrZcdnioNalas4bTLaqQdbvU8ixc73YZKUu7xYFGRy2+x+q5uQ9hF5KD7SqTVfSlhSA1lPVXE4cae1vThVrPdUqrbT+0Wq8n05ldwDWaz0Pu7sAO2K298Gd/Z9cr8RArHq3G25ayJ3uf+6vhBBCCCGEEEIIIYSQb/wCIbMP1+B8V50AAAAASUVORK5CYII=";

const NewPlace = () => {
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>(
    noImageUrl
  );
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

  const { fileMutate, refetch, isSuccess } = useNewPlace({
    category: checkboxValue,
    addressName: addressValue,
    body: descriptionValue,
    storeName: nameValue,
    phone: phoneNumberValue,
    homepage: homePageValue,
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
  }, [isSuccess, navigate]);

  return (
    <SContainer>
      <h1>매장 등록</h1>
      <SForm onSubmit={handleSubmit}>
        <section>
          <ImgPreview
            id="대표사진"
            label="대표사진등록"
            previewUrl={previewUrl as string}
            setPreviewUrl={setPreviewUrl}
            mutate={fileMutate}
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
