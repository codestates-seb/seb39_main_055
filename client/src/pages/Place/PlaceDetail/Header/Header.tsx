import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";
import { HiOutlineHeart } from "react-icons/hi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { deletePlace } from "../../../../apis/place";
import { DeleteModal, useModal } from "../../../../components";
import { Store } from "../../../../types";
import { averageStar } from "../../../../utils";

export const SHeader = styled.header`
  padding: 35px 0;
  border-bottom: 1px solid #dbdbdb;

  & > p {
    color: #434343;
    font-size: 26px;
    margin-bottom: 10px;
  }
`;

export const STitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;

  & > h1 {
    color: #161616;
    font-size: 36px;

    &:after {
      content: "";
      display: block;
      width: 32px;
      border-bottom: 3px solid #161616;
      margin-top: 8px;
    }
  }

  & > svg {
    color: #ffc107;
    fill: #ffc107;
    font-size: 32px;
    cursor: pointer;
  }
`;

export const SScoreContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  & > svg {
    margin-right: 6px;
    font-size: 26px;
    color: #ffc107;
    fill: #ffc107;
  }

  & > span {
    margin-right: 20px;
    color: #707070;
    font-size: 18px;
  }

  & > div {
    display: flex;
    align-items: center;
    color: #ffa000;
    fill: #ffa000;
    font-size: 18px;
    cursor: pointer;

    & > svg {
      font-size: 24px;
    }
  }
`;

export const SLocationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  color: #707070;
  font-size: 18px;

  & > div:first-child {
    display: flex;
    align-items: center;
    gap: 10px;

    & > svg {
      fill: #707070;
      font-size: 30px;
    }

    & > span {
      vertical-align: middle;
    }
  }

  & > div:last-child {
    display: flex;
    align-items: center;
    gap: 10px;

    & > button {
      width: 60px;
      height: 28px;
      color: #161616;
      background-color: inherit;
      border: 1px solid #161616;
      border-radius: 20px;
      font-size: 16px;
      transition: all 0.4s;

      &:hover {
        background-color: #ffc107;
        border-color: #ffc107;
      }
    }
  }
`;

interface Prop {
  data: Store | undefined;
}

const Header = ({ data }: Prop) => {
  // 좋아요 api 연결
  // const [isLike, setIsLike] = useState(false);
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();
  const { mutate } = useMutation(deletePlace, {
    onSuccess: () => navigate("/place/list"),
  });

  const handleDelete = () => {
    mutate(data?.storeId as string);
    closeModal();
  };

  return (
    <SHeader>
      <STitle>
        <h1>{data?.storeName}</h1>
        <HiOutlineHeart />
      </STitle>
      {/* <p>{data.addressName}</p> */}
      <SScoreContainer>
        <AiFillStar />
        <span>{data?.reviews.data && averageStar(data?.reviews.data)}</span>
        <div>
          <span>리뷰보기</span>
          <MdOutlineKeyboardArrowRight />
        </div>
      </SScoreContainer>
      <SLocationContainer>
        <div>
          <FaMapMarkerAlt />
          <span>{data?.addressName}</span>
        </div>
        <div>
          <button
            type="button"
            onClick={() => navigate("/place/edit", { state: data })}
          >
            수정
          </button>
          <button
            type="button"
            onClick={() =>
              openModal(
                <DeleteModal
                  title="매장을 삭제 하시겠습니까?"
                  onCancel={closeModal}
                  onDelete={handleDelete}
                />
              )
            }
          >
            삭제
          </button>
        </div>
      </SLocationContainer>
    </SHeader>
  );
};

export default Header;
