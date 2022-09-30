import styled from "styled-components";

import { colors } from "../../assets";
import Logo from "../../assets/images/logo/logo2.png";

export const SNoResultBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  row-gap: 20px;
  height: 700px;
  width: 100%;
`;

export const SH2 = styled.h2`
  color: ${colors("black300")};
`;
interface NoResultProps {
  title: string;
}
const NoResult = ({ title = "결과가 없습니다." }: NoResultProps) => {
  return (
    <SNoResultBox>
      <SH2>{title}</SH2>
      <img src={Logo} alt="메인 로고" width="55px" />
    </SNoResultBox>
  );
};

export default NoResult;
