/* eslint-disable react/no-array-index-key */
import { AiFillStar } from "react-icons/ai";
import styled from "styled-components";

import { UserInfos } from "../../../../types";

export const SReviewList = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 15px;
  min-height: 200px;
  padding: 20px;
  border: 1px solid #dbdbdb;
  border-radius: 10px;
`;

export const SUserInfo = styled.div`
  display: flex;
  align-items: center;

  & > img {
    width: 45px;
    height: 45px;
    margin-right: 15px;
    border-radius: 50%;
    object-fit: cover;
  }

  & > div {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
`;

export const SStars = styled.div`
  display: flex;
  align-items: center;

  & > svg {
    margin-right: 2px;
    color: #ffc109;
  }

  & > p {
    display: flex;
    margin-left: 5px;
    color: #707070;
    padding-top: 2px;
    font-size: 12px;
  }
`;

export const SBody = styled.p`
  color: #434343;
  font-size: 16px;
  line-height: 30px;
`;

export const SDate = styled.p`
  font-size: 14px;
  color: #707070;
`;

interface Prop {
  storeId: string;
  reviewId: string;
  user: UserInfos;
  updatedAt: string;
  body: string;
  score: number;
}

const ReviewCard = ({
  reviewId,
  updatedAt,
  user,
  storeId,
  body,
  score,
}: Prop) => {
  return (
    <SReviewList>
      <SUserInfo>
        <img src={user.image} alt="profile" />
        <div>
          <span>{user.nickname}</span>
          <SStars>
            {[...Array(score)].map((_, index) => (
              <AiFillStar key={index} />
            ))}
            <p>{score.toFixed(1)}</p>
          </SStars>
        </div>
      </SUserInfo>
      <SBody>{body}</SBody>
      <SDate>{updatedAt.slice(0, 10)}</SDate>
    </SReviewList>
  );
};

export default ReviewCard;
