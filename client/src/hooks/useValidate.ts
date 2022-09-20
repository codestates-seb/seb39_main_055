/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable default-param-last */
import { ChangeEvent, useCallback, useState } from "react";

type ValidateCallback = (value: string, password?: string) => boolean;

type UseValidate = (
  callback: ValidateCallback
) => [
  string,
  boolean,
  (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    password?: string
  ) => void,
  (password?: string) => void,
  React.Dispatch<React.SetStateAction<string>>,
  React.Dispatch<React.SetStateAction<boolean>>
];

export const useValidate: UseValidate = (validateCallback) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const handleChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      password?: string
    ) => {
      const { value } = e.target;

      if ((e as ChangeEvent<HTMLInputElement>).target.files) {
        const { name } = (e as ChangeEvent<HTMLInputElement>).target.files![0];

        setValue(name);

        if (validateCallback(name)) setError(false);
        if (!validateCallback(name)) setError(true);

        return;
      }

      function oninputPhone(value: any) {
        value = value
          .replace(/[^0-9]/g, "")
          .replace(
            /(^02.{0}|^01.{1}|[0-9]{3,4})([0-9]{3,4})([0-9]{4})/g,
            "$1-$2-$3"
          );
        return value;
      }

      setValue(oninputPhone(value));

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
