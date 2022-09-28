/* eslint-disable no-useless-return */
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { addReview } from "../../../../apis/place";
import { useModal } from "../../../../components";
import { ErrorModal, LoginModal } from "../../../../components/Modal";
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

  &:hover {
    scale: 1.1;
  }

  &:disabled {
    color: #161616;
    background-color: #dbdbdb;

    &:hover {
      scale: 1;
    }
  }
`;

interface Prop {
  data: Store | undefined;
}

const ReviewForm = ({ data }: Prop) => {
  const { openModal } = useModal();
  const { loginStatus, userInfos } = useAppSelector((state) => state.user);

  const params = useParams();
  const [validate, setValidate] = useState(true);
  const [ratingIndex, setRatingIndex] = useState(0);
  const [reviewValue, setReviewValue] = useState("");

  const queryClient = useQueryClient();
  const { mutate } = useMutation(addReview, {
    onSuccess: () => {
      setReviewValue("");
      setRatingIndex(0);
      queryClient.invalidateQueries(["place", params.id]);
    },
  });

  const registerReviewUserList = data?.reviews.data.map(
    (review) => review.user.userId
  );

  const handleFocus = () => {
    if (!loginStatus) {
      openModal(<LoginModal />);
      return;
    }

    if (userInfos?.userId === data?.user.userId) {
      openModal(
        <ErrorModal body="자신이 등록한 매장에는 리뷰를 등록할 수 없습니다." />
      );
      return;
    }

    if (registerReviewUserList?.includes(userInfos?.userId as number)) {
      openModal(<ErrorModal body="이미 작성한 리뷰가 존재합니다." />);
      return;
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
    if (ratingIndex && reviewValue.trim().length) {
      setValidate(false);
    } else {
      setValidate(true);
    }
  }, [ratingIndex, reviewValue]);

  return (
    <STextAreaContainer>
      <STextArea
        placeholder="리뷰를 작성해주세요."
        value={reviewValue}
        onFocus={handleFocus}
        onChange={(e) => setReviewValue(e.target.value)}
      />
      <div>
        <RatingStar
          data={data}
          ratingIndex={ratingIndex}
          setRatingIndex={setRatingIndex}
        />
        <SButton disabled={validate} onClick={handleSubmit}>
          입력
        </SButton>
      </div>
    </STextAreaContainer>
  );
};

export default ReviewForm;
