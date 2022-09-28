import { useState } from "react";
import styled from "styled-components";

import RatingStar from "../RatingStar/RatingStar";

export const STextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border: 1px solid #dbdbdb;
  border-radius: 10px;

  & > div:last-child {
    display: flex;
    justify-content: space-between;
  }
`;

export const STextArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  outline: none;
  border: none;
  /* border: 1px solid #dbdbdb; */
  color: #000000;
  font-size: 16px;
  font-family: "Noto Sans KR", sans-serif;
  resize: none;

  &::placeholder {
    font-size: 16px;
    color: #767676;
  }
`;

export const SButton = styled.button<{ isFocus: boolean }>`
  padding: 10px 20px;
  color: ${({ isFocus }) => (isFocus ? "#ffffff" : "#161616")};
  background-color: ${({ isFocus }) => (isFocus ? "#ffc107" : "#dbdbdb")};
  border: none;
  border-radius: 10px;
  font-size: 18px;
  font-family: "ONE-Mobile-Regular";
  transition: all 0.4s;

  &:hover {
    scale: 1.1;
  }
`;

const ReviewForm = () => {
  const [ratingIndex, setRatingIndex] = useState(0);
  const [reviewValue, setReviewValue] = useState("");
  return (
    <STextAreaContainer>
      <STextArea
        placeholder="리뷰를 작성해주세요."
        value={reviewValue}
        onChange={(e) => setReviewValue(e.target.value)}
      >
        asd
      </STextArea>
      <div>
        <RatingStar ratingIndex={ratingIndex} setRatingIndex={setRatingIndex} />
        <SButton isFocus>입력</SButton>
      </div>
    </STextAreaContainer>
  );
};

export default ReviewForm;
