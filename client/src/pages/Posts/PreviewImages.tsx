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

import { colors } from "../../assets";
import { useModal } from "../../components";
import { extractImageInfos } from "../../utils";
import DefaultImgSelect from "./DefaultImgSelect";
import { Images } from "./NewPost";

const SImageAside = styled.aside`
  display: flex;
  flex-flow: column nowrap;
  flex: 1 1 20%;
  padding: 85px 20px 20px 25px;
`;

const SRepImageBox = styled.div`
  position: relative;
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

const SFileLabel = styled.label.attrs({
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

const SFileInput = styled.input.attrs({
  type: "file",
  id: "upload-image",
  multiple: true,
})`
  width: 0;
  height: 0;
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

export const SThumbnailUList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(75px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(calc((100% - 20px) / 3), 0));
  gap: 10px;
  margin-top: 17px;
  height: 250px;
  overflow: hidden;
`;

export const SList = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow: hidden;
  border-radius: 5px;
`;

export const SImg = styled.img`
  object-fit: cover;
  max-height: 100%;
  clip-path: inset(1px round 5px);
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

  const prevHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const images = e.target.files;
    if (!images?.length || !editorRef.current) return;

    const addedImage = await extractImageInfos([...images]);

    editorRef.current.getInstance().focus();

    setImages((prev) => [...prev, ...addedImage]);
  };

  const handleSelectImages = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const images = e.target.files;
      const workerInst = workers.current.length;
      const L = Math.ceil((images || []).length / workerInst);

      if (!images?.length || !editorRef.current) return;

      const uploaded: Images[] = [];

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
            // FIXME: state 변경을 한번에 처리할 수 있도록
            setImages((prev) => [...prev, ...e.data]);
          }
          wk.removeEventListener("message", callee);
        });

        wk.postMessage(imagePacking);
      });
    },
    []
  );

  useEffect(() => {
    if (!workers.current) return;

    const maxWorker = navigator.hardwareConcurrency || 2;

    workers.current = new Array(maxWorker).fill(0).map(() => {
      return new Worker(
        new URL("../../utils/imageLoad.worker.ts", import.meta.url)
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
        <SFileLabel>
          <p>사진을 추가해주세요.</p>
          <p>(Ctrl 또는 Shift로 다중 선택)</p>
        </SFileLabel>
        <SFileInput accept="image/*" onChange={handleSelectImages} />
      </SRepImageBox>
      <SButton
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
      </SButton>
      <SThumbnailUList>
        {images.map(({ uri, md5 }, i) => (
          <SList key={md5}>
            <SImg src={uri} alt={`${i}-th image to upload`} />
          </SList>
        ))}
      </SThumbnailUList>
    </SImageAside>
  );
};

export default PreviewImages;
