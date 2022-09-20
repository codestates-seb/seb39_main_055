/* eslint-disable jsx-a11y/label-has-associated-control */
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import styled from "styled-components";

export const SPreview = styled.div`
  width: 200px;
  height: 200px;

  & > img {
    width: 200px;
    height: 200px;
    object-fit: fill;
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
    gap: 7px;
    cursor: pointer;

    & > svg {
      width: 20px;
      height: 20px;
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
}

const ImgPreview = ({ id, label, imgUrl, setImgUrl }: Prop) => {
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
        <img src={imgUrl as string} alt="preview-img" />
      </SPreview>
      <label htmlFor={id}>
        {label} <MdOutlineKeyboardArrowRight />
      </label>
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

export default ImgPreview;
