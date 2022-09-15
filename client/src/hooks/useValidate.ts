/* eslint-disable default-param-last */
import { ChangeEvent, useCallback, useState } from "react";

type ValidateCallback = (value: string, password?: string) => boolean;

type UseValidate = (
  callback: ValidateCallback
) => [
  string,
  boolean,
  (e: ChangeEvent<HTMLInputElement>, password?: string) => void,
  (password?: string) => void
];

export const useValidate: UseValidate = (validateCallback) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, password?: string) => {
      const { value } = e.target;

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

  return [value, error, handleChange, handleCheck];
};
