/* eslint-disable no-return-assign */
/* eslint-disable react/no-array-index-key */
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
  SCanvas,
  SError,
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
  defaultId: string;
  setDefaultId: Dispatch<SetStateAction<string>>;
  isError?: boolean;
  setIsError?: Dispatch<SetStateAction<boolean>>;
}

const PreviewImages = ({
  images,
  setImages,
  defaultId,
  setDefaultId,
  isError,
  setIsError,
}: PostImagesProps) => {
  const workers = useRef<Worker[]>([]);
  const { openModal, closeModal } = useModal();

  const handleSelectImages = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const images = e.target.files;
      const workerInst = workers.current.length;
      const L = Math.ceil((images || []).length / workerInst);

      if (!images?.length) return;

      workers.current.forEach((wk, i) => {
        const startI = L * i + i;
        let endI = startI + L + 1;
        if (endI > images.length) {
          endI = images.length;
        }
        const imagePacking = [...images].slice(startI, endI);
        const canvas: any = document.createElement("canvas");
        const offscreen = canvas?.transferControlToOffscreen();

        wk.addEventListener("message", function callee({ data }) {
          if (data.length) {
            setImages((prev) => [...prev, ...data]);
          }
          wk.removeEventListener("message", callee);
        });

        wk.postMessage({ images: imagePacking, canvas: offscreen }, [
          offscreen,
        ]);
      });

      if (setIsError) {
        setIsError(false);
      }
    },
    []
  );

  const removeImg = (targetId: string) => {
    setImages((prev) => prev.filter((image) => image.id !== targetId));
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
          type="button"
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
        <SError isError={isError}>
          <p>대표사진을 등록해주세요.</p>
        </SError>
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
