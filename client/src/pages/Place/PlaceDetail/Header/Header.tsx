import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";
import { HiOutlineHeart } from "react-icons/hi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import {
  cancelHeart,
  deletePlace,
  registerHeart,
} from "../../../../apis/place";
import { DeleteModal, useModal } from "../../../../components";
import { LoginModal } from "../../../../components/Modal";
import { useAppSelector } from "../../../../redux";
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

export const STitle = styled.div<{ isLike: boolean }>`
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
    color: ${({ isLike }) => isLike && "#ffc107"};
    fill: ${({ isLike }) => isLike && "#ffc107"};
    font-size: 32px;
    cursor: pointer;
    transition: all 0.4s;
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
  const userId = 3;
  const params = useParams();
  const navigate = useNavigate();
  const [isLike, setIsLike] = useState(false);
  const { openModal, closeModal } = useModal();
  const { userInfos, loginStatus } = useAppSelector((state) => state.user);

  const queryClient = useQueryClient();
  const { mutate: deletePlaceMutate } = useMutation(deletePlace, {
    onSuccess: () => navigate("/place/list"),
  });
  const { mutate: registerHeartMutate } = useMutation(registerHeart, {
    onSuccess: () => queryClient.invalidateQueries(["place", params.id]),
  });
  const { mutate: cancelHeartMutate } = useMutation(cancelHeart, {
    onSuccess: () => queryClient.invalidateQueries(["place", params.id]),
  });

  const handleDelete = () => {
    deletePlaceMutate(data?.storeId as string);
    closeModal();
  };

  const handleHeartClick = () => {
    if (!loginStatus) {
      openModal(<LoginModal />);
      return;
    }
    if (isLike) {
      cancelHeartMutate(data?.storeId as string);
    }
    if (!isLike) {
      registerHeartMutate(data?.storeId as string);
    }
  };

  useEffect(() => {
    if (data?.heartUserId.includes(userId)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [userId, data]);

  return (
    <SHeader>
      <STitle isLike={isLike}>
        <h1>{data?.storeName}</h1>
        <HiOutlineHeart onClick={handleHeartClick} />
      </STitle>
      <SScoreContainer>
        <AiFillStar />
        {/* <span>{data?.reviews.data && averageStar(data?.reviews.data)}</span> */}
        <span>0.0(0)</span>
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
        {userInfos?.email === data?.user.email && (
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
        )}
      </SLocationContainer>
    </SHeader>
  );
};

export default Header;
