import { Dispatch, ReactNode, SetStateAction } from "react";

export interface OpenContext {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export type Position =
  | {
      x: string;
      y: string;
    }
  | undefined;

export interface Size {
  width: string;
  height: string;
  minWidth?: string;
  minHeight?: string;
}

export interface CustomizeContext {
  setSize: null | Dispatch<SetStateAction<Size>>;
  setPosition: null | Dispatch<SetStateAction<Position>>;
}

export interface MainContext {
  openModal: null | ((component: ReactNode) => void);
  closeModal: null | (() => void);
}

export interface ModalStyle {
  width: string;
  height: string;
  minWidth?: string;
  minHeight?: string;
  position?: Position;
  borderRadius?: string;
  boxShadow?: string;
}

export interface ModalProps extends ModalStyle {
  background: boolean;
  content: ReactNode;
}

export type ModalContextProps = Exclude<ModalStyle, "position"> & {
  background: boolean;
  children: ReactNode;
};
