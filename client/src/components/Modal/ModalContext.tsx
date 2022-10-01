/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable react/jsx-no-constructed-context-values */
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import Modal from "./Modal";
import {
  CustomizeContext,
  MainContext,
  ModalContextProps,
  OpenContext,
  Position,
  Size,
} from "./types";

export const MainCtx = createContext<MainContext | null>(null);
export const CustomizeCtx = createContext<CustomizeContext | null>(null);
export const OpenCtx = createContext<OpenContext | null>(null);

export const ModalCtx = ({
  width,
  height,
  minWidth,
  minHeight,
  position,
  borderRadius,
  boxShadow,
  background = true,
  children,
}: ModalContextProps) => {
  const [mount, setMount] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalSize, setModalSize] = useState<Size>({ width, height });
  const [modalPosition, setModalPosition] = useState<Position>(position);
  const [content, setContent] = useState<ReactNode>(null);
  const customize = useRef<CustomizeContext>({
    setSize: null,
    setPosition: null,
  });
  const modalCommand = useRef<MainContext>({
    openModal: null,
    closeModal: null,
  });

  const openModal = useCallback(
    (component: ReactNode) => {
      // 현재 context에 모달이 열려있으면 openModal()을 한번 더 실행했을 때 다른 context에서 뜨는 문제 발생
      // 1. 열려있는 상태일 때 닫아주는 코드 추가: delayed unmount 때문에 350ms 이후에 닫아야 함
      /* if (mount && isOpen) {
        setIsOpen(false);
        setMount(false);

        setTimeout(() => {
          console.log("닫기");
          setMount(true);
          setIsOpen(true);
          setContent(component);
        }, 90);
        return;
      } */

      setMount(true);
      setIsOpen(true);
      setContent(component);
    },
    [mount, isOpen]
  );
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    let timerId: ReturnType<typeof setInterval>;

    if (!isOpen) {
      // Modal close 애니메이션을 위해 delayed unmount
      timerId = setTimeout(() => setMount(false), 350);
    }
    document.body.style.overflowY = isOpen ? "hidden" : "auto";

    return () => clearTimeout(timerId);
  }, [isOpen, mount]);

  customize.current.setSize = setModalSize;
  customize.current.setPosition = setModalPosition;

  modalCommand.current.openModal = openModal;
  modalCommand.current.closeModal = closeModal;

  return (
    <MainCtx.Provider value={modalCommand.current}>
      <CustomizeCtx.Provider value={customize.current}>
        <OpenCtx.Provider value={{ isOpen, setIsOpen }}>
          {mount && (
            <Modal
              width={modalSize.width}
              height={modalSize.height}
              minWidth={minWidth}
              minHeight={minHeight}
              borderRadius={borderRadius}
              boxShadow={boxShadow}
              position={modalPosition}
              background={background}
              content={content}
            />
          )}
        </OpenCtx.Provider>
        {children}
      </CustomizeCtx.Provider>
    </MainCtx.Provider>
  );
};
