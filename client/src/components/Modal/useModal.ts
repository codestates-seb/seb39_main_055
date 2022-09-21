import { useEffect } from "react";

import { CustomizeCtx, MainCtx } from "./ModalContext";
import { Position, Size } from "./types";
import useAppContext from "./useAppContext";

type useModalProps =
  | {
      width?: string;
      height?: string;
      position?: Position;
      borderRadius?: string;
      boxShadow?: string;
    }
  | undefined;

const useModal = (props?: useModalProps) => {
  const { width, height, position, borderRadius, boxShadow } = props || {};
  const { openModal, closeModal } = useAppContext(MainCtx);
  const { setSize, setPosition } = useAppContext(CustomizeCtx);

  if (!openModal || !closeModal || !setSize || !setPosition) {
    throw new Error("useModal was used outside of ModalCtx.Provider.");
  }

  useEffect(() => {
    setSize((prev: Size) => {
      if (!width && height) return { ...prev, height };
      if (!height && width) return { ...prev, width };
      if (height && width) return { width, height };
      return prev;
    });
  }, [width, height, setSize]);

  useEffect(() => {
    if (!position) return;
    const { x, y } = position;

    setPosition({ x, y });
  }, [position, setPosition]);

  return { openModal, closeModal };
};

export default useModal;
