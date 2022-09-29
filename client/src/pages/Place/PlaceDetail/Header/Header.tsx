import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";
import { HiOutlineHeart } from "react-icons/hi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

import { cancelHeart, deletePlace, registerHeart } from "../../../../apis";
import { DeleteModal, LoginModal, useModal } from "../../../../components";
import { useAppSelector } from "../../../../redux";
import { Review, Store } from "../../../../types";
import { averageStar } from "../../../../utils";
import {
  SCategory,
  SHeader,
  SLocationContainer,
  SScoreContainer,
  STitle,
} from "./style";

interface Prop {
  data: Store | undefined;
  reviewRef: React.RefObject<HTMLUListElement>;
}

const Header = ({ data, reviewRef }: Prop) => {
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
    if (data?.heartUserId.includes(userInfos?.userId as number)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [userInfos, data]);

  return (
    <SHeader>
      <SCategory>{data?.category}</SCategory>
      <STitle isLike={isLike}>
        <h1>{data?.storeName}</h1>
        <HiOutlineHeart onClick={handleHeartClick} />
      </STitle>
      <SScoreContainer>
        <AiFillStar />
        <span>
          {(data?.reviews.data.length as number) > 0
            ? averageStar(data?.reviews.data as Review[])
            : "0.0(0)"}
        </span>
        <div
          onClick={() =>
            reviewRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
        >
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
