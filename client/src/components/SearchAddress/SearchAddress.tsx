import { useDaumPostcodePopup } from "react-daum-postcode";
import styled from "styled-components";

const SButton = styled.button`
  padding: 7px 10px;
  color: white;
  border: none;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.orange500};
  font-size: 12px;
  transition: 0.4s all;

  &:hover {
    color: ${({ theme }) => theme.colors.orange500};
    background-color: #ffffff;
  }
`;

interface Prop {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  setCoordinate?: React.Dispatch<
    React.SetStateAction<{ longitude: string; latitude: string }>
  >;
}

const SearchAddress = ({ setValue, setError, setCoordinate }: Prop) => {
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

    setValue(fullAddress);
    setError(false);
  };

  const popupX = window.screen.width / 2 - 250;
  const popupY = window.screen.height / 2 - 300;

  const handleClick = () => {
    open({
      onComplete: handleComplete,
      top: popupY,
      left: popupX,
    });
  };

  return (
    <SButton onClick={handleClick} type="button">
      주소 검색
    </SButton>
  );
};

export default SearchAddress;
