import { useDaumPostcodePopup } from "react-daum-postcode";
import styled from "styled-components";

const SButton = styled.button`
  width: 70px;
  height: 30px;
  color: white;
  border: none;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.orange500};
  transition: 0.4s all;

  &:hover {
    color: ${({ theme }) => theme.colors.orange500};
    background-color: #ffffff;
  }
`;

interface Prop {
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchAddress = ({ setValue }: Prop) => {
  const open = useDaumPostcodePopup();

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    setValue(fullAddress);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return <SButton onClick={handleClick}>주소 검색</SButton>;
};

export default SearchAddress;
