import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getCoordinate, useCoordinateConvert } from "../../../apis";
import useEditProfiles from "../../../apis/user/editProfiles";
import {
  changeUserAddress,
  changeUserImage,
  changeUserNickname,
  selectUserInfos,
  useAppDispatch,
  useAppSelector,
} from "../../../redux";
import { ThreadImages } from "../../../types";
import { extractImageInfos, nickNameValidation } from "../../../utils";
import {
  EditInput,
  ProfileImage,
  SaBox,
  SAddressBox,
  SAddressInput,
  SaSection,
  SbBox,
  SbSection,
  SButton,
  SearchAddressButton,
  SFileInput,
  SForm,
  SH1,
  SP,
} from "./style";

const initialData = {
  nickname: "",
  image: "",
  latitude: 0,
  longitude: 0,
};

const EditMyInfos = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { nickname, image, latitude, longitude } =
    useAppSelector(selectUserInfos) || initialData;
  const { address } = useCoordinateConvert({
    x: longitude,
    y: latitude,
  });
  const newImage = useRef<ThreadImages | string>(image);
  const [imageErr, setImageErr] = useState(false);
  const [nicknameErr, setNicknameErr] = useState(false);
  const [addressErr, setAddressErr] = useState(false);
  const { mutate, isLoading, isSuccess } = useEditProfiles();

  /* if (!nickname) {
    toast.info("로그인 해주세요.");

    return <Navigate to="/login" />;
  } */

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;

    if (!nickNameValidation(newName)) {
      setNicknameErr(true);
      return;
    }
    setNicknameErr(false);
    dispatch(changeUserNickname(newName));
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files;
    if (!image?.length) return;

    const imageInfos = (await extractImageInfos([...image]))[0];

    newImage.current = imageInfos;
    dispatch(changeUserImage(imageInfos.uri));
  };

  const handleAddressChange = async (address: string) => {
    const addressName = address.match(/(.*)(?=\s\()/g);

    if (!addressName) {
      setAddressErr(true);
      return;
    }
    setAddressErr(false);
    const { documents } = await getCoordinate(addressName[0]);

    if (documents.length === 1) {
      const { x, y } = documents[0];
      const newAddress = { longitude: Number(x), latitude: Number(y) };

      dispatch(changeUserAddress(newAddress));
    }
  };

  const handleSubmit = () => {
    const isSubmitReady = !imageErr && !nicknameErr && !addressErr;

    if (!isSubmitReady) {
      toast.error("입력 필드를 다시 확인해주세요.");
      return;
    }
    mutate({ nickname, latitude, longitude, image: newImage.current });
  };

  useEffect(() => {
    if (!isSuccess) return;

    navigate("/mypage");
  }, [isSuccess, navigate]);

  return (
    <SForm onSubmit={(e) => e.preventDefault()}>
      <SH1>회원 정보 수정</SH1>
      <SaBox>
        <SbBox>
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
              errorMsg="닉네임은 두 글자 이상 입력해주세요."
              onChange={handleNicknameChange}
            />
            <SAddressBox>
              <SAddressInput
                type="text"
                label="주소"
                id="location"
                value={address}
                placeholder="변경할 주소 입력"
                isError={false}
                errorMsg="주소를 입력해주세요."
                readOnly
                onChange={() => {
                  "d";
                }}
              />
              <SearchAddressButton
                setValue={handleAddressChange}
                setError={setAddressErr}
              />
            </SAddressBox>
          </SbSection>
        </SbBox>
        <SButton onClick={handleSubmit} isPending={isLoading}>
          회원정보 수정
        </SButton>
      </SaBox>
    </SForm>
  );
};

export default EditMyInfos;
