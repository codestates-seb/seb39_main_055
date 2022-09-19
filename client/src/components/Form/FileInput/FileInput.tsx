import styled from "styled-components";

const SContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: 12px;
  display: inline-block;

  & > label {
    padding: 8px 9px;
    color: white;
    border: none;
    border-radius: 3px;
    background-color: ${({ theme }) => theme.colors.orange500};
    font-size: 12px;
    transition: 0.4s all;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors.orange500};
      background-color: #ffffff;
    }
  }

  & > input {
    display: none;
  }
`;

interface Prop {
  id: string;
  label: string;
}

const FileInput = ({ id, label }: Prop) => {
  return (
    <SContainer>
      <label htmlFor={id}>{label}</label>
      <input
        type="file"
        id={id}
        onChange={(e) => {
          if (e.target.files) {
            console.log(e.target.files[0]);
          }
        }}
      />
    </SContainer>
  );
};

export default FileInput;
