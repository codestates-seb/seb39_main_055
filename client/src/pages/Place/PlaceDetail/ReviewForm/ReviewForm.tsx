/* eslint-disable no-useless-return */
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { addReview } from "../../../../apis";
import { ErrorModal, LoginModal, useModal } from "../../../../components";
import { useAppSelector } from "../../../../redux";
import { Store } from "../../../../types";
import RatingStar from "../RatingStar/RatingStar";
import { SButton, SCancelButton, STextArea, STextAreaContainer } from "./style";

interface Prop {
  isEdit: boolean;
  setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>;
  submitCallback?: ({ body, score }: { body: string; score: number }) => void;
  prevValue?: { body: string; score: number };
  data?: Store | undefined;
  initialState?: { body: string; score: number };
}

const ReviewForm = ({
  isEdit,
  setIsEdit,
  submitCallback,
  prevValue,
  data,
  initialState = { body: "", score: 0 },
}: Prop) => {
  const { openModal } = useModal();
  const { loginStatus, userInfos } = useAppSelector((state) => state.user);

  const params = useParams();
  const [validate, setValidate] = useState(true);
  const [ratingIndex, setRatingIndex] = useState(initialState.score);
  const [reviewValue, setReviewValue] = useState(initialState.body);

  const queryClient = useQueryClient();
  const { mutate } = useMutation(addReview, {
    onSuccess: () => {
      setReviewValue("");
      setRatingIndex(0);
      queryClient.invalidateQueries(["place", params.id]);
      queryClient.invalidateQueries(["review", params.id]);
    },
  });

  const registerReviewUserList = data?.reviews.data.map(
    (review) => review.user.userId
  );

  const handleFocus = () => {
    if (!isEdit) {
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
    }
  };

  const handleSubmit = () => {
    if (isEdit && submitCallback) {
      if (ratingIndex === prevValue?.score && reviewValue === prevValue?.body) {
        openModal(<ErrorModal body="변경된 내용이 없습니다." />);
        return;
      }

      submitCallback({ body: reviewValue, score: ratingIndex });
      return;
    }

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
        <div>
          {isEdit && setIsEdit && (
            <SCancelButton onClick={() => setIsEdit(false)}>취소</SCancelButton>
          )}
          <SButton disabled={validate} onClick={handleSubmit}>
            {isEdit ? "수정" : "입력"}
          </SButton>
        </div>
      </div>
    </STextAreaContainer>
  );
};

export default ReviewForm;
