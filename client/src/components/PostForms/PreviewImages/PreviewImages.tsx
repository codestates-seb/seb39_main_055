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
  SaBox,
  SaButton,
  SaLabel,
  SbBox,
  SFileInput,
  SImageAside,
  SList,
  SMore,
  SRepImg,
  SThumbnailUList,
} from "./style";

export interface PostImagesProps {
  images: ThreadImages[];
  setImages: Dispatch<SetStateAction<ThreadImages[]>>;
  editorRef: RefObject<Editor>;
  defaultId: string;
  setDefaultId: Dispatch<SetStateAction<string>>;
}

const PreviewImages = ({
  images,
  setImages,
  editorRef,
  defaultId,
  setDefaultId,
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

  const removeImg = (targetId: string) => {
    setImages((prev) => prev.filter(({ id }) => id !== targetId));
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

  const defaultImage = images.filter(({ id }, i) => {
    if (!defaultId) return i === 0;
    return id === defaultId;
  })[0];

  return (
    <SImageAside>
      <SaBox>
        <SbBox>
          {!!images.length && (
            <SRepImg src={defaultImage.uri} alt="대표 이미지" />
          )}
          <SaLabel>
            <p>사진을 추가해주세요.</p>
            <p>(Ctrl 또는 Shift로 다중 선택)</p>
          </SaLabel>
          <SFileInput accept="image/*" onChange={handleSelectImages} />
        </SbBox>
        <SaButton
          onClick={() =>
            openModal(
              <DefaultImgSelect
                images={images}
                defaultId={defaultId}
                setDefaultId={setDefaultId}
                closeModal={closeModal}
              />
            )
          }
        >
          <p>대표사진 변경</p>
          <SMore />
        </SaButton>
      </SaBox>
      <SThumbnailUList>
        {images.map(({ uri, id }, i) => (
          <SList key={id}>
            <InteractiveImage
              label="클릭해서 제거"
              hoverColor="#ff1c1ca7"
              imageURL={uri}
              alt={`${i}-th image to upload`}
              onClick={() => removeImg(id)}
            />
          </SList>
        ))}
      </SThumbnailUList>
    </SImageAside>
  );
};

export default PreviewImages;
