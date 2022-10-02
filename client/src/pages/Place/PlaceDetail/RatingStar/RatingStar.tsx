/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import { Dispatch, SetStateAction } from "react";
import { AiFillStar } from "react-icons/ai";
import styled from "styled-components";

import { useModal } from "../../../../components";
import { ErrorModal, LoginModal } from "../../../../components/Modal";
import { useAppSelector } from "../../../../redux";
import { Store } from "../../../../types";
import { convertScoreToComment } from "../../../../utils";

const SRatingContainer = styled.div`
  display: flex;
  align-items: center;

  .active {
    color: #ffc109;
  }

  & > p {
    margin-left: 10px;
    color: #707070;
    font-size: 14px;
  }
`;

const SStar = styled(AiFillStar)`
  color: #dbdbdb;
  cursor: pointer;
  transition: all 0.4s;
`;

interface Prop {
  data?: Store | undefined;
  ratingIndex: number;
  setRatingIndex: Dispatch<SetStateAction<number>>;
}

const RatingStar = ({ ratingIndex, setRatingIndex, data }: Prop) => {
  const { openModal } = useModal();
  const { loginStatus, userInfos } = useAppSelector((state) => state.user);
  const registerReviewUserList = data?.reviews.data.map(
    (review) => review.user.userId
  );

  const handleStarClick = (index: number) => {
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

    setRatingIndex(index);
  };

  return (
    <SRatingContainer>
      {[1, 2, 3, 4, 5].map((arrayIndex, index) => (
        <SStar
          size={20}
          key={`rating_${index}`}
          className={arrayIndex <= ratingIndex ? "active" : "inactive"}
          onClick={() => handleStarClick(arrayIndex)}
        />
      ))}
      <p>{convertScoreToComment(ratingIndex)}</p>
    </SRatingContainer>
  );
};

export default RatingStar;
