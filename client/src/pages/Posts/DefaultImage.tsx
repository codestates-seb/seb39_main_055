import styled, { css } from "styled-components";

import { colors } from "../../assets";
import { Images } from "./AddNewPost";

const SImageAside = styled.aside`
  display: flex;
  flex-flow: column nowrap;
  flex: 1 1 20%;
  padding: 20px 20px 20px 25px;
`;

const SRepImageBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 200px;
  border: 3px solid ${colors("black010")};
  border-radius: 5px;
`;

const SRepImg = styled.img`
  max-width: 100%;
  object-fit: contain;
`;

const SButton = styled.button`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  column-gap: 5px;
  border: 0px;
  background-color: white;
  margin-top: 15px;
  margin-left: auto;
  color: ${colors("black300")};
  font-size: 15px;
`;

const arrowDefault = css`
  content: "";
  position: absolute;
  display: block;
  width: 10px;
  height: 2px;
  background-color: ${colors("black250")};
  border-radius: 0px 10px 10px 10px;
  box-shadow: -5px -5px 20px white;
`;

const SMore = styled.span`
  display: inline-block;
  position: relative;
  width: 12px;
  top: -9%;

  &::before {
    ${arrowDefault}
    transform-origin: 100% 100%;
    transform: rotate(40deg) scale(1.06);
  }

  &::after {
    ${arrowDefault}
    transform-origin: 95% 50%;
    transform: rotate(-40deg);
  }
`;

const SThumbnailBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(65px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(calc((100% - 20px) / 3), 76px));
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 17px;
  height: 250px;
  overflow: hidden;
`;

const SImg = styled.img`
  object-fit: contain;
  max-height: 100%;
`;

interface PostImagesProps {
  images: Images[];
}

const PostImages = ({ images }: PostImagesProps) => {
  return (
    <SImageAside>
      <SRepImageBox>
        {!!images.length && <SRepImg src={images[0].uri} alt="대표 이미지" />}
      </SRepImageBox>
      <SButton>
        <p>대표사진 변경</p>
        <SMore />
      </SButton>
      <SThumbnailBox>
        {images.map(({ uri, md5 }, i) => (
          <SImg
            src={uri}
            width="100%"
            key={md5}
            alt={`${i}-th images to upload`}
          />
        ))}
      </SThumbnailBox>
    </SImageAside>
  );
};

export default PostImages;
