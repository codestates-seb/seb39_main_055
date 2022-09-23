/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import { Editor } from "@toast-ui/react-editor";
import {
  ChangeEvent,
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from "react";
import styled, { css } from "styled-components";

import { colors } from "../../../assets";
import { InteractiveImage, useModal } from "../../../components";
import DefaultImgSelect from "./DefaultImgSelect";
import { Images } from "./NewPost";

export const SImageAside = styled.aside`
  display: flex;
  flex-flow: column nowrap;
  flex: 1 1 20%;
  padding: 85px 20px 20px 25px;
`;

export const SRepImageBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 200px;
  border: 3px solid ${colors("black010")};
  border-radius: 5px;
`;

export const SRepImg = styled.img`
  max-width: 100%;
  object-fit: contain;
`;

export const SaLabel = styled.label.attrs({
  htmlFor: "upload-image",
})`
  position: absolute;
  display: flex;
  flex-flow: column wrap;
  row-gap: 5px;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  color: rgba(0, 0, 0, 0);
  transition: 600ms all;

  &:hover {
    background-color: rgba(124, 124, 124, 0.7);
    color: white;
  }
`;

export const SFileInput = styled.input.attrs({
  type: "file",
  id: "upload-image",
  multiple: true,
})`
  width: 0;
  height: 0;
`;

export const SaButton = styled.button`
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

export const arrowDefault = css`
  content: "";
  position: absolute;
  display: block;
  width: 10px;
  height: 2px;
  background-color: ${colors("black250")};
  border-radius: 0px 10px 10px 10px;
  box-shadow: -5px -5px 20px white;
`;

export const SMore = styled.span`
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

export const SThumbnailUList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(calc((100% - 30px) / 4), 0));
  gap: 10px;
  margin-top: 17px;
  height: 330px;
  overflow: hidden;
`;

export const SList = styled.li`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow: hidden;
  border-radius: 5px;
`;

export interface PostImagesProps {
  images: Images[];
  setImages: Dispatch<SetStateAction<Images[]>>;
  editorRef: RefObject<Editor>;
  defaultImg: number;
  setDefaultImg: Dispatch<SetStateAction<number>>;
}

const PreviewImages = ({
  images,
  setImages,
  editorRef,
  defaultImg,
  setDefaultImg,
}: PostImagesProps) => {
  const workers = useRef<Worker[]>([]);
  const { openModal, closeModal } = useModal();

  const handleSelectImages = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const images = e.target.files;
      const workerInst = workers.current.length;
      const L = Math.ceil((images || []).length / workerInst);

      if (!images?.length || !editorRef.current) return;

      editorRef.current.getInstance().focus();

      workers.current.forEach((wk, i) => {
        const startI = L * i + i;
        let endI = startI + L + 1;
        if (endI > images.length) {
          endI = images.length;
        }
        const imagePacking = [...images].slice(startI, endI);

        wk.addEventListener("message", function callee(e) {
          if (e.data.length) {
            setImages((prev) => [...prev, ...e.data]);
          }
          wk.removeEventListener("message", callee);
        });

        wk.postMessage(imagePacking);
      });
    },
    []
  );

  const removeImg = (id: string) => {
    setImages((prev) => prev.filter(({ md5 }) => md5 !== id));
  };

  useEffect(() => {
    if (!workers.current) return;

    const maxWorker = navigator.hardwareConcurrency || 2;

    workers.current = new Array(maxWorker).fill(0).map(() => {
      return new Worker(
        new URL("../../../utils/imageLoad.worker.ts", import.meta.url)
      );
    });

    return () => {
      workers.current.forEach((wk) => wk.terminate());
    };
  }, []);

  return (
    <SImageAside>
      <SRepImageBox>
        {!!images.length && (
          <SRepImg src={images[defaultImg].uri} alt="대표 이미지" />
        )}
        <SaLabel>
          <p>사진을 추가해주세요.</p>
          <p>(Ctrl 또는 Shift로 다중 선택)</p>
        </SaLabel>
        <SFileInput accept="image/*" onChange={handleSelectImages} />
      </SRepImageBox>
      <SaButton
        onClick={() =>
          openModal(
            <DefaultImgSelect
              images={images}
              defaultImg={defaultImg}
              setDefaultImg={setDefaultImg}
              closeModal={closeModal}
            />
          )
        }
      >
        <p>대표사진 변경</p>
        <SMore />
      </SaButton>
      <SThumbnailUList>
        {images.map(({ uri, md5 }, i) => (
          <SList key={md5}>
            <InteractiveImage
              label="클릭해서 제거"
              hoverColor="#ff1c1ca7"
              imageURL={uri}
              alt={`${i}-th image to upload`}
              onClick={() => removeImg(md5)}
            />
          </SList>
        ))}
      </SThumbnailUList>
    </SImageAside>
  );
};

export default PreviewImages;
