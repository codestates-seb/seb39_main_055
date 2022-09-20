/* eslint-disable no-return-assign */
import { useState } from "react";

export const useCheckbox = (defaultValue: string) => {
  const [checkboxValue, setCheckboxValue] = useState(defaultValue);

  const handleCheckboxClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    document
      .querySelectorAll(`input[type=checkbox]`)
      .forEach((el: any) => (el.checked = false));

    const { target } = e;
    target.checked = true;
    setCheckboxValue(target.value);
    console.log(target.value);
  };

  return { checkboxValue, handleCheckboxClick };
};
