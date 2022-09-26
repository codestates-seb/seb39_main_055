import { ChangeEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";

import { useCoordinateConvert } from "../../../apis";
import { colors } from "../../../assets";
import {
  ButtonOrange,
  Input,
  InteractiveImage,
  SearchAddress,
} from "../../../components";
import {
  changeUserImage,
  selectUserInfos,
  useAppDispatch,
  useAppSelector,
} from "../../../redux";
import { extractImageInfos } from "../../../utils";

const SForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  margin: 100px 0px;
`;

const SH1 = styled.h1`
  font-size: 42px;
  font-weight: normal;
  margin-bottom: 30px;
`;

const SaBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  max-width: 650px;
  column-gap: 15px;
`;

const SbBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  border: 1px solid ${colors("black050")};
  border-radius: 13px;
  padding: 50px 20px;
`;

const SaSection = styled.section`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  height: 280px;
  width: 150px;
`;

const ProfileImage = styled(InteractiveImage)`
  border-radius: 5px;
  height: 100px;
`;

const SFileInput = styled.input`
  width: 0;
  height: 0;
`;

const SP = styled.p`
  font-weight: bold;
  margin-top: 10px;
`;

const SbSection = styled.section`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  row-gap: 20px;
`;

const EditInput = styled(Input)`
  column-gap: 15px;

  & div {
    flex: 1 1 auto;
    border-bottom: 1px solid ${colors("black050")};
  }

  & label {
    font-weight: bold;
    flex: 0 1 max-content;
    width: max-content;
  }

  & input {
    height: 35px;
    font-size: 15px;
  }
`;

const SAddressBox = styled.div`
  display: flex;
  position: relative;
`;

const SAddressInput = styled(EditInput)`
  & input {
    padding-right: 70px;
  }
`;

const SearchAddressButton = styled(SearchAddress)`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
  height: 25px;
  width: 60px;
  padding: 5px 3px;
`;

const SButton = styled(ButtonOrange)`
  /* height: 40px; */
  margin-top: 40px;
`;

const initialData = {
  nickname: "",
  image: "",
  latitude: 0,
  longitude: 0,
};

const EditMyInfos = () => {
  const dispatch = useAppDispatch();
  const { nickname, image, latitude, longitude } =
    useAppSelector(selectUserInfos) || initialData;
  const { address, isLoading } = useCoordinateConvert({
    x: longitude,
    y: latitude,
  });
  const [newAddress, setNewAddress] = useState("");
  const [imageErr, setImageErr] = useState(false);
  const [nicknameErr, setNicknameErr] = useState(false);
  const [addressErr, setAddressErr] = useState(false);

  /* if (!nickname) {
    toast.info("로그인 해주세요.");

    return <Navigate to="/login" />;
  } */
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files;
    if (!image?.length) return;

    const { uri } = (await extractImageInfos([...image]))[0];
    dispatch(changeUserImage(uri));
  };

  const handleAddressChange = () => {};

  const handleSubmit = () => {};

  return (
    <SForm>
      <SH1>회원 정보 수정</SH1>
      <SbBox>
        <SaBox>
          <SaSection>
            <ProfileImage
              imageURL={image}
              htmlFor="change-thumbnail"
              alt="user"
              label="변경할 이미지 선택"
              hoverColor="#fcd86d"
            />
            <SFileInput
              type="file"
              id="change-thumbnail"
              onChange={handleImageChange}
            />
            <SP>프로필 사진</SP>
          </SaSection>
          <SbSection>
            <EditInput
              type="text"
              label="이름"
              id="name"
              value={nickname}
              placeholder="변경할 이름 입력"
              isError={nicknameErr}
              errorMsg="dsf"
              onChange={() => console.log("F")}
            />
            <SAddressBox>
              <SAddressInput
                type="text"
                label="주소"
                id="location"
                value={address}
                placeholder="변경할 주소 입력"
                isError={false}
                errorMsg="dsf"
                readOnly
                onChange={handleAddressChange}
              />
              <SearchAddressButton
                setValue={setNewAddress}
                setError={setAddressErr}
              />
            </SAddressBox>
          </SbSection>
        </SaBox>
        <SButton onClick={handleSubmit}>회원정보 수정</SButton>
      </SbBox>
    </SForm>
  );
};

export default EditMyInfos;
