/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import { Dispatch, SetStateAction } from "react";
import { AiFillStar } from "react-icons/ai";
import styled from "styled-components";

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
  return (
    <SRatingContainer>
      {[1, 2, 3, 4, 5].map((arrayIndex, index) => (
        <SStar
          size={25}
          key={`rating_${index}`}
          className={arrayIndex <= ratingIndex ? "active" : "inactive"}
          onClick={() => setRatingIndex(arrayIndex)}
        />
      ))}
      <p>별점을 남겨주세요.</p>
    </SRatingContainer>
  );
};

export default RatingStar;
