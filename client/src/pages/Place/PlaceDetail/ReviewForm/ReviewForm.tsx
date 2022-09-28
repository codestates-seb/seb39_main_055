import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { addReview } from "../../../../apis/place";
import { useModal } from "../../../../components";
import { LoginModal } from "../../../../components/Modal";
import { useAppSelector } from "../../../../redux";
import { Store } from "../../../../types";
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

export const SButton = styled.button`
  padding: 10px 20px;
  color: #ffffff;
  background-color: #ffc107;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  font-family: "ONE-Mobile-Regular";
  transition: all 0.4s;

  /* &:hover {
    scale: 1.1;
  } */

  &:disabled {
    color: #161616;
    background-color: #dbdbdb;
  }
`;

interface Prop {
  data: Store | undefined;
}

const ReviewForm = ({ data }: Prop) => {
  const { openModal } = useModal();
  const { loginStatus } = useAppSelector((state) => state.user);

  const queryClient = useQueryClient();
  const params = useParams();
  const [validate, setValidate] = useState(true);
  const [ratingIndex, setRatingIndex] = useState(0);
  const [reviewValue, setReviewValue] = useState("");

  const { mutate } = useMutation(addReview, {
    onSuccess: () => queryClient.invalidateQueries(["place", params.id]),
  });

  const handleFocus = () => {
    if (!loginStatus) {
      openModal(<LoginModal />);
    }
  };

  const handleSubmit = () => {
    mutate({
      storeId: params.id as string,
      body: reviewValue,
      score: ratingIndex,
    });
  };

  useEffect(() => {
    if (ratingIndex && reviewValue.trim().length > 4) {
      setValidate(false);
    } else {
      setValidate(true);
    }
  }, [ratingIndex, reviewValue]);

  return (
    <STextAreaContainer onFocus={handleFocus}>
      <STextArea
        placeholder="5글자 이상 작성해주세요."
        value={reviewValue}
        onChange={(e) => setReviewValue(e.target.value)}
      />
      <div>
        <RatingStar ratingIndex={ratingIndex} setRatingIndex={setRatingIndex} />
        <SButton disabled={validate} onClick={handleSubmit}>
          입력
        </SButton>
      </div>
    </STextAreaContainer>
  );
};

export default ReviewForm;
