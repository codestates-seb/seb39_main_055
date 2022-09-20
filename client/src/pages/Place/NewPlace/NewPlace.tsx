/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-return-assign */
import { useState } from "react";
import styled from "styled-components";

import {
  ButtonOrange,
  Checkbox,
  FileInput,
  ImgPreview,
  Input,
  SearchAddress,
  TextArea,
} from "../../../components";
import { useCheckbox, useValidate } from "../../../hooks";
import { notBlank, phoneNumberValidation, urlValidation } from "../../../utils";

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 380px);
  margin: 100px 0;

  & > h1 {
    font-size: 42px;
    color: #161616;
  }
`;

export const SForm = styled.form`
  display: flex;
  gap: 50px;
  width: 100%;
  margin-top: 50px;
  padding: 100px 100px 50px 50px;
  border: 1px solid #dbdbdb;

  & > section:first-child {
    flex-basis: 30%;
  }

  & > section:last-child {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 50px;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.tablet}) {
    flex-direction: column;
    width: 90%;
    padding: 20px;
  }
`;

export const SCheckboxContainer = styled.div`
  display: flex;
  align-items: center;

  & > span {
    flex-basis: 30%;
    color: #464646;
    font-size: 16px;
    cursor: pointer;
  }

  & > section {
    flex-basis: 70%;
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;

    & > section > div {
      flex-basis: 40%;
      flex-grow: 1;
    }
  }
`;

export const SButton = styled(ButtonOrange)`
  width: 150px;
  border-radius: 25px;
  margin-left: 130px;
  padding: 0 30px;

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.tablet}) {
    margin: 0 auto;
  }
`;

const noImageUrl =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHUAAAB1CAMAAABH2l6OAAAAMFBMVEW7u7vz8/PCwsK+vr7V1dX29vbv7+/Gxsa4uLjMzMzh4eH5+fnc3NzJycns7Oy1tbXhfB7JAAABWElEQVRoge2X2Y6EIBBFRSgplsH//9vBNdK2iU6umZd7XrobOzlSVBXQdYQQQgghhBBCCCGEkLfon6EIp0YxT5CI0NpHTlNf0SKsg2R7Fc3TA5tlgFiN8Zcx00o74FFW8ZdSH0tuh96w2mZmGpKIDG9bfSpNtMucP+44hLdqmQqj2yV2qaly/Dvcqm6yiLhRt0cz8d257iUZxuU1cqq/UpNsaOuY9yYl6/JqlmRCk2Fgq/Zt35vTWbv14y3rGD96n9tl6tzeLLBW/fncBGTYYutFSli9WOs4fOn0y/JqkZrZcdnioNalas4bTLaqQdbvU8ixc73YZKUu7xYFGRy2+x+q5uQ9hF5KD7SqTVfSlhSA1lPVXE4cae1vThVrPdUqrbT+0Wq8n05ldwDWaz0Pu7sAO2K298Gd/Z9cr8RArHq3G25ayJ3uf+6vhBBCCCGEEEIIIYSQb/wCIbMP1+B8V50AAAAASUVORK5CYII=";

const NewPlace = () => {
  const { checkboxValue, handleCheckboxClick } = useCheckbox();
  const [
    addressValue,
    addressError,
    handleAddress,
    checkAddress,
    setAddressValue,
    setAddressError,
  ] = useValidate(notBlank);
  const [nameValue, nameError, handleName, checkName] = useValidate(notBlank);
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
  const [homePageValue, homePageError, handleHomePage, checkHomePage] =
    useValidate(urlValidation);
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(
    noImageUrl
  );
  const [
    descriptionValue,
    descriptionError,
    handleDescription,
    checkDescription,
  ] = useValidate(notBlank);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    checkName();
    checkRegistration();
    checkAddress();
    checkPhoneNumber();
    checkHomePage();
    checkHomePage();
    checkDescription();
  };

  return (
    <SContainer>
      <h1>매장 등록</h1>
      <SForm onSubmit={handleSubmit}>
        <section>
          <ImgPreview
            id="대표사진"
            label="대표사진등록"
            imgUrl={imageSrc as string}
            setImgUrl={setImageSrc}
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
            errorMsg="매장 홈페이지 주소를 입력해주세요."
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
