/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import { Dispatch, SetStateAction } from "react";
import { AiFillStar } from "react-icons/ai";
import styled from "styled-components";

import { useModal } from "../../../../components";
import { LoginModal } from "../../../../components/Modal";
import { useAppSelector } from "../../../../redux";

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
  ratingIndex: number;
  setRatingIndex: Dispatch<SetStateAction<number>>;
}

const RatingStar = ({ ratingIndex, setRatingIndex }: Prop) => {
  const { openModal } = useModal();
  const { loginStatus } = useAppSelector((state) => state.user);

  const handleStarClick = (index: number) => {
    if (!loginStatus) {
      openModal(<LoginModal />);
      return;
    }
    setRatingIndex(index);
  };

  return (
    <SRatingContainer>
      {[1, 2, 3, 4, 5].map((arrayIndex, index) => (
        <SStar
          size={25}
          key={`rating_${index}`}
          className={arrayIndex <= ratingIndex ? "active" : "inactive"}
          onClick={() => handleStarClick(arrayIndex)}
        />
      ))}
      <p>
        {ratingIndex === 5
          ? "아주 좋아요"
          : ratingIndex === 4
          ? "맘에 들어요"
          : ratingIndex === 3
          ? "보통이에요"
          : ratingIndex === 2
          ? "그냥 그래요"
          : ratingIndex === 1
          ? "별로에요"
          : "별점을 남겨주세요."}
      </p>
    </SRatingContainer>
  );
};

export default RatingStar;
