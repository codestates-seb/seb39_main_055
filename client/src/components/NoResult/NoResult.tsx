/* eslint-disable react/no-unescaped-entities */
import styled from "styled-components";

import logo from "../../assets/images/logo/logo-cat.svg";

export const SContainer = styled.section<{ height: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${({ height }) => height};
  background-color: #f5f5f5;
  border-radius: 10px;
  color: #707070;

  & > img {
    width: 50px;
    height: 50px;
    margin-bottom: 20px;
  }

  & > h1 {
    color: #161616;
    font-size: 16px;
  }

  & > P {
    margin-bottom: 10px;
  }
`;

interface Prop {
  title: string;
  comment1?: string;
  comment2?: string;
  height?: string;
  className?: string;
}

const NoResult = ({
  title,
  comment1,
  comment2,
  height = "500px",
  className,
}: Prop) => {
  return (
    <SContainer height={height} className={className}>
      <img src={logo} alt="noResult" />
      <h1>{title}</h1>
      {comment1 && <p>{comment1}</p>}
      {comment2 && <p>{comment2}</p>}
    </SContainer>
  );
};

export default NoResult;
