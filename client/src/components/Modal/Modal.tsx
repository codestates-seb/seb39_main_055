import { OpenCtx } from "./ModalContext";
import { Background, ModalMain } from "./style";
import { ModalProps } from "./types";
import useAppContext from "./useAppContext";

const Modal = ({
  width,
  height,
  minWidth,
  minHeight,
  position,
  borderRadius,
  boxShadow,
  background = true,
  content,
}: ModalProps) => {
  const { isOpen, setIsOpen } = useAppContext(OpenCtx);

  return (
    <>
      {background && (
        <Background isMount={isOpen} onClick={() => setIsOpen(false)} />
      )}
      <ModalMain
        isMount={isOpen}
        width={width}
        height={height}
        minWidth={minWidth}
        minHeight={minHeight}
        borderRadius={borderRadius}
        boxShadow={boxShadow}
        position={position}
      >
        {content}
      </ModalMain>
    </>
  );
};

export default Modal;
