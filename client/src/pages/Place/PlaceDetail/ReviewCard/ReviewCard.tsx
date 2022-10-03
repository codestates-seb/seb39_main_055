/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";

import { deleteReview, editReview } from "../../../../apis";
import { Dots } from "../../../../components";
import { useAppSelector } from "../../../../redux";
import { UserInfos } from "../../../../types";
import { convertScoreToComment } from "../../../../utils";
import ReviewForm from "../ReviewForm/ReviewForm";
import { SBody, SDate, SReviewList, SStars, SUserInfo } from "./style";

interface Prop {
  reviewId: string;
  user: UserInfos;
  updatedAt: string;
  body: string;
  score: number;
}

const ReviewCard = ({ reviewId, updatedAt, user, body, score }: Prop) => {
  const params = useParams();
  const { userInfos } = useAppSelector((state) => state.user);
  const [isEdit, setIsEdit] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: deleteMutate } = useMutation(deleteReview, {
    onSuccess: () => {
      queryClient.invalidateQueries(["place", params.id]);
      queryClient.invalidateQueries(["review", params.id]);
    },
  });

  const { mutate: editMutate } = useMutation(editReview, {
    onSuccess: () => {
      setIsEdit(false);
      queryClient.invalidateQueries(["place", params.id]);
      queryClient.invalidateQueries(["review", params.id]);
    },
  });

  const handleEdit = (payload: { body: string; score: number }) => {
    const { body, score } = payload;
    editMutate({ reviewId, body, score });
  };

  return (
    <SReviewList>
      <SUserInfo>
        <section>
          <img src={user.image} alt="profile" />
          <div>
            <span>{user.nickname}</span>
            <SStars>
              {[...Array(5)].map((_, index) => (
                <AiFillStar
                  key={index}
                  className={index + 1 <= score ? "active" : "inactive"}
                />
              ))}
              <p>{convertScoreToComment(score)}</p>
            </SStars>
          </div>
        </section>
        {user.userId === userInfos?.userId && (
          <Dots
            deleteModalTitle="리뷰를 삭제 하시겠습니까?"
            onDelete={() => deleteMutate(reviewId)}
            onEdit={() => setIsEdit(true)}
          />
        )}
      </SUserInfo>
      <SBody>
        {isEdit ? (
          <ReviewForm
            submitCallback={(payload) => handleEdit(payload)}
            isEdit
            prevValue={{ body, score }}
            setIsEdit={setIsEdit}
            initialState={{ body, score }}
          />
        ) : (
          body
        )}
      </SBody>
      <SDate>{updatedAt.slice(0, 10)}</SDate>
    </SReviewList>
  );
};

export default ReviewCard;
