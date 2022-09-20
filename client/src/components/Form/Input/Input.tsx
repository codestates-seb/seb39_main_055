/* eslint-disable jsx-a11y/label-has-associated-control */
import { SComment, SError, SInput, SInputContainer } from "./style";

interface Prop {
  type?: "password" | "text";
  label?: string;
  id: string;
  value: any;
  isError: boolean;
  errorMsg: string;
  comment?: string;
  placeholder: string;
  className?: string;
  sideButton?: JSX.Element;
  readOnly?: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void | React.Dispatch<React.SetStateAction<string>>;
}

const Input = ({
  type = "text",
  label,
  id,
  value,
  isError,
  errorMsg,
  comment,
  placeholder,
  className,
  sideButton,
  readOnly,
  onChange,
}: Prop) => {
  return (
    <SInputContainer className={className}>
      {label && <label htmlFor={id}>{label}</label>}
      <SInput isLabel={label} isSideButton={sideButton}>
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          readOnly={readOnly}
          onChange={(e) => onChange(e)}
        />
        {isError && <SError isError={isError}>{errorMsg}</SError>}
        {!isError && comment && (
          <SComment isError={isError}>{comment}</SComment>
        )}
        {sideButton}
      </SInput>
    </SInputContainer>
  );
};

export default Input;
