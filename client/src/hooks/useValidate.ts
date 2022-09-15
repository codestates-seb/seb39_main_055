/* eslint-disable default-param-last */
import { ChangeEvent, useCallback, useState } from "react";

type ValidateCallback = (value: string) => boolean;

type UseValidate = (
  callback: ValidateCallback
) => [string, boolean, (e: ChangeEvent<HTMLInputElement>) => void];

export const useValidate: UseValidate = (validateFn) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const handler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      setValue(value);

      if (validateFn(value)) {
        setError(false);
      }

      if (!validateFn(value)) {
        setError(true);
      }
    },
    [validateFn]
  );

  return [value, error, handler];
};
