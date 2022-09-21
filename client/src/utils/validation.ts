/* eslint-disable no-useless-escape */
export const notBlank = (value: string) => {
  return value.trim().length > 0;
};

export const nickNameValidation = (value: string) => {
  return value.length > 1;
};

export const emailValidation = (value: string) => {
  const EMAIL_REGEX =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  return EMAIL_REGEX.test(value);
};

export const passwordValidation = (value: string) => {
  const ENG_NUM_REGEX = /^[a-zA-Z0-9]*$/;
  const { length } = value.trim();

  return ENG_NUM_REGEX.test(value) && length > 5 && length < 21;
};

export const passwordCheckValidation = (value: string, password: string) => {
  return value === password && notBlank(value);
};

export const phoneNumberValidation = (value: string) => {
  const PHONE_NUMBER_REGEX =
    /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-[0-9]{3,4}-[0-9]{4}$/;

  return PHONE_NUMBER_REGEX.test(value);
};

export const urlValidation = (value: string) => {
  const URL_REGEX =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

  return URL_REGEX.test(value);
};

export const descriptionValidation = (value: string) => {
  const { length } = value.trim();

  return length > 19;
};
