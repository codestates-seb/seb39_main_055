import { ReactNode } from "react";

import { Buttton, Spinner } from "./style";

export interface ButtonProps {
  children: ReactNode;
  className?: string;
  bgColor?: string;
  hoverColor?: string;
  textColor?: string;
  onClick?: () => void | Promise<void>;
  polymorphic?: "li" | "div" | "a";
  isPending?: boolean;
  isError?: boolean;
  disabled?: boolean;
}

const DefaultBtn = ({
  bgColor,
  hoverColor,
  textColor,
  polymorphic,
  className,
  isError = false,
  isPending = false,
  children,
  onClick,
  disabled = false,
}: ButtonProps) => {
  return (
    <Buttton
      bgColor={bgColor}
      hoverColor={hoverColor}
      textColor={textColor}
      as={polymorphic || "button"}
      isError={isError}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {isPending && <Spinner />}
      {children}
    </Buttton>
  );
};

export default DefaultBtn;
