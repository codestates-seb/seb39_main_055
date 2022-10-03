/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/label-has-associated-control */
import styled from "styled-components";

import { axiosInstance } from "../../utils";

export const SPreview = styled.div`
  width: 200px;
  height: 200px;

  & > img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  & > label {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    border: 1px solid #dbdbdb;
    border-radius: 10px;
    color: #707070;
    cursor: pointer;
    transition: all 0.4s;

    &:hover {
      color: #ffffff;
      border-color: #ffc107;
      background-color: #ffc107;
    }
  }

  & > input {
    display: none;
  }
`;

export const getImgUrl = async (files: FileList): Promise<string[]> => {
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i]);
  }

  const { data } = await axiosInstance.post("/v1/user/upload", formData, {
    headers: {
      tokenNeeded: true,
      "Content-Type": "multipart/form-data",
    },
  });

  return data.data;
};

interface Prop {
  id: string;
  label: string;
  imgUrl: string;
  setImgUrl: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>;
}

const ProfileImage = ({ id, label, imgUrl, setImgUrl }: Prop) => {
  const encodeFileToBase64 = (fileBlob: Blob) => {
    console.log(fileBlob);
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setImgUrl(reader.result);
        resolve();
      };
    });
  };

  return (
    <SContainer>
      <SPreview>
        <img src={imgUrl} alt="preview-img" />
      </SPreview>
      <label htmlFor={id}>{label}</label>
      <input
        type="file"
        id={id}
        onChange={(e) => {
          encodeFileToBase64((e.target.files as FileList)[0]);
        }}
      />
    </SContainer>
  );
};

export default ProfileImage;
