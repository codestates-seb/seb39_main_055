/* eslint-disable jsx-a11y/label-has-associated-control */
import styled from "styled-components";

export const SCheckbox = styled.div`
  display: flex;
  gap: 10px;

  & > label {
    display: flex;
    align-items: center;
    padding-top: 2.5px;
    color: #767676;
    font-size: 13px;
    cursor: pointer;
  }

  & > input {
    width: 20px;
    height: 20px;
    margin: 0;
    cursor: pointer;
  }
`;

interface Prop {
  id: string;
  labelName: string;
  value: string;
  defaultChecked: boolean;
  className?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void | React.Dispatch<React.SetStateAction<string>>;
}

const Checkbox = ({
  id,
  labelName,
  value,
  className,
  onChange,
  defaultChecked,
}: Prop) => {
  return (
    <SCheckbox className={className}>
      <input
        type="checkbox"
        id={id}
        value={value}
        defaultChecked={defaultChecked}
        onChange={(e) => onChange(e)}
      />
      <label htmlFor={id}>{labelName}</label>
    </SCheckbox>
  );
};

export default Checkbox;
