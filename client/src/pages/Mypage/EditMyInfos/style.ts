import styled, { css } from "styled-components";

import { colors, mobile, tablet } from "../../../assets";
import {
  ButtonOrange,
  Input,
  InteractiveImage,
  SearchAddress,
} from "../../../components";

export const SForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  height: 900px;
`;

export const SH1 = styled.h1`
  font-size: 42px;
  font-weight: normal;
  margin-bottom: 30px;

  ${mobile(css`
    font-size: 35px;
  `)}
`;

export const SaBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  border: 1px solid ${colors("black050")};
  border-radius: 13px;
  padding: 30px 30px 50px 30px;
  max-width: 650px;
  width: 80%;
  row-gap: 45px;

  ${tablet(css`
    width: 85%;
  `)}
`;

export const SbBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  column-gap: 15px;

  ${mobile(css`
    flex-flow: column wrap;
  `)}
`;

export const SaSection = styled.section`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  height: 210px;
  min-width: 150px;
`;

export const ProfileImage = styled(InteractiveImage)`
  border-radius: 5px;
  height: 100px;

  ${mobile(css``)}
`;

export const SFileInput = styled.input`
  width: 0;
  height: 0;
`;

export const SP = styled.p`
  font-weight: bold;
  margin-top: 10px;
`;

export const SbSection = styled.section`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  row-gap: 40px;
`;

export const EditInput = styled(Input)`
  column-gap: 15px;

  & div {
    flex: 1 1 auto;
    transition: 400ms all;
    border-bottom: 1px solid
      ${({ isError }) => (isError ? `red` : `${colors("black050")}`)};

    & > p {
      top: 42px;
    }
  }

  & label {
    font-weight: bold;
    flex: 0 1 max-content;
    width: max-content;
  }

  & input {
    height: 35px;
    font-size: 15px;
  }
`;

export const SAddressBox = styled.div`
  display: flex;
  position: relative;
`;

export const SAddressInput = styled(EditInput)`
  & input {
    padding-right: 70px;
  }
`;

export const SearchAddressButton = styled(SearchAddress)`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
  height: 25px;
  width: 60px;
  padding: 5px 2px;

  ${tablet(css`
    top: 72%;
  `)}
`;

export const SButton = styled(ButtonOrange)`
  max-width: 90%;
`;
