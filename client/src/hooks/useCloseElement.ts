import { useCallback, useEffect, useRef, useState } from "react";

type UseCloseElement = () => [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.RefObject<HTMLDivElement>
];

export const useCloseElement: UseCloseElement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    ({ target }) => {
      if (isOpen && !elementRef.current?.contains(target)) setIsOpen(false);
    },
    [isOpen]
  );

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  return [isOpen, setIsOpen, elementRef];
};
