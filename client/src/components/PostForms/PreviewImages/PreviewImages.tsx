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

import { ThreadImages } from "../../../types";
import { InteractiveImage, useModal } from "../..";
import DefaultImgSelect from "../DefaultImgSelect/DefaultImgSelect";
import {
  SaButton,
  SaLabel,
  SFileInput,
  SImageAside,
  SList,
  SMore,
  SRepImageBox,
  SRepImg,
  SThumbnailUList,
} from "./style";

export interface PostImagesProps {
  images: ThreadImages[];
  setImages: Dispatch<SetStateAction<ThreadImages[]>>;
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