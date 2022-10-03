import { ChangeEvent } from "react";
import styled from "styled-components";

import { ThreadImages } from "../../types/threads";
import { extractImageInfos } from "../../utils";

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
    font-size: 12px;

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
interface Prop {
  id: string;
  label: string;
  imgUrl: string;
  setImgUrl: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>;
  imgFile: React.MutableRefObject<string | ThreadImages>;
}

const ProfileImage = ({ id, label, imgUrl, setImgUrl, imgFile }: Prop) => {
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files;
    if (!image?.length) return;

    const imageInfos = (await extractImageInfos([...image]))[0];

    imgFile.current = imageInfos;
    setImgUrl(imageInfos.uri);
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
        accept="image/*"
        onChange={(e) => handleImageChange(e)}
      />
    </SContainer>
  );
};

export default ProfileImage;
