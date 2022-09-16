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
