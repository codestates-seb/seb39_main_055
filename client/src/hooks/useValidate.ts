/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable default-param-last */
import { ChangeEvent, useCallback, useState } from "react";

type ValidateCallback = (value: string, password?: string) => boolean;

type UseValidate = (
  callback: ValidateCallback
) => [
  string,
  boolean,
  (e: ChangeEvent<HTMLInputElement>, password?: string) => void,
  (password?: string) => void,
  React.Dispatch<React.SetStateAction<string>>,
  React.Dispatch<React.SetStateAction<boolean>>
];

export const useValidate: UseValidate = (validateCallback) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, password?: string) => {
      const { value } = e.target;
      const { name } = (e.target.files as FileList)[0];

      if (name) {
        setValue(name);

        if (validateCallback(name)) setError(false);
        if (!validateCallback(name)) setError(true);

        return;
      }

      setValue(value);

      if (validateCallback(value, password)) {
        setError(false);
      }

      if (!validateCallback(value, password)) {
        setError(true);
      }
    },
    [validateCallback]
  );

  const handleCheck = (password?: string) => {
    if (validateCallback(value, password)) {
      setError(false);
    }

    if (!validateCallback(value, password)) {
      setError(true);
    }
  };

  return [value, error, handleChange, handleCheck, setValue, setError];
};
