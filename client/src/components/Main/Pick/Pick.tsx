import { useState } from "react";
import { CgChevronRight } from "react-icons/cg";

import { data } from "./PickData";
import SideText from "./SideText";
import {
  SContainer,
  SContents,
  SContentsInfo,
  SecondTextLine,
  SSideContents,
  STextContainer,
  SUserPickContents,
} from "./style";

const Pick = () => {
  const [crrImg, setCrrImg] = useState(data[1]);

  const handleOnChange = (e: any) => {
    setCrrImg(e.target.value);
  };

  const [imgIdx, setImgIdx] = useState(0);
  return (
    <SContainer>
      <STextContainer>
        <SideText />
      </STextContainer>
      <SContents>
        <SSideContents>
          <img
            onClick={() => setImgIdx(0)}
            alt="hand"
            src="https://user-images.githubusercontent.com/104320234/189981170-e4ceda7e-b5ff-4de1-8791-be0679027363.png"
          />
          <img
            onClick={() => setImgIdx(1)}
            alt="ktx"
            src="https://user-images.githubusercontent.com/104320234/190197236-2c14cd20-1867-4562-a249-abe026dcc096.png"
          />
          <img
            onClick={() => setImgIdx(2)}
            alt="airplane"
            src="https://user-images.githubusercontent.com/104320234/190197670-8d50fc24-c298-449c-9bae-cd69a3c73e46.png"
          />
        </SSideContents>
        <SUserPickContents>
          <img
            alt=""
            src={data[imgIdx].image}
            onChange={handleOnChange}
            onClick={() => {
              window.open(`${data[imgIdx].link}`, "_blank");
            }}
          />
          <SContentsInfo>
            <div onChange={handleOnChange}>{data[imgIdx].textLine1}</div>
            <SecondTextLine onChange={handleOnChange}>
              {data[imgIdx].textLine2}
              <CgChevronRight size={40} />
            </SecondTextLine>
          </SContentsInfo>
        </SUserPickContents>
      </SContents>
    </SContainer>
  );
};

export default Pick;
