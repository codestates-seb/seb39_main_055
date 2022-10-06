/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-return-assign */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { toast } from "react-toastify";

import { ThreadImages } from "../../../types";
import { throttle } from "../../../utils";
import { InteractiveImage, useModal } from "../..";
import DefaultImgSelect from "../DefaultImgSelect/DefaultImgSelect";
import {
  SaBox,
  SaButton,
  SaLabel,
  SbBox,
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

interface WorkerMessage {
  images: ThreadImages[];
  error: string;
}

const MAX_IMAGES = 15;

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
      const selectedImages = e.target.files;
      const workerInst = workers.current.length;
      const L = Math.ceil((selectedImages || []).length / workerInst);

      if (!selectedImages?.length) return;

      workers.current.forEach((wk, i) => {
        const startI = L * i + i;
        let endI = startI + L + 1;
        if (endI > selectedImages.length) {
          endI = selectedImages.length;
        }
        const imagePacking = [...selectedImages].slice(startI, endI);
        const canvas = document.createElement("canvas");
        // @ts-ignore
        const offscreen = canvas?.transferControlToOffscreen();

        wk.addEventListener(
          "message",
          function callee({ data }: MessageEvent<WorkerMessage>) {
            const { images, error } = data;

            if (images.length) {
              setImages((prev) => [...prev, ...images]);
            }
            if (error) {
              // 한번에 둘 이상의 Toast가 뜨지 않도록 throttling
              throttle(() => toast.error(error), 100);
            }

            wk.removeEventListener("message", callee);
          }
        );

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
          <p>대표사진을 5장 이상 등록해주세요.</p>
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
