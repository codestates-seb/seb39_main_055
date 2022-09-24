import { useState } from "react";
import { HiOutlineHeart } from "react-icons/hi";
import styled from "styled-components";

import { Dots } from "../../../../components";

export const SList = styled.li`
  border-bottom: 1px solid #bdbdbd;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 150px;
  padding-bottom: 40px;
`;

export const SUtils = styled.section`
  flex-basis: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    font-size: 30px;
    color: #a5a5a5;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      color: #161616;
    }
  }
`;

export const SUserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  & > img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
  }

  & > span {
    font-size: 16px;
    color: #161616;
  }
`;

export const SBody = styled.p`
  flex-grow: 1;
  line-height: 35px;
`;

export const SBottom = styled.section<{ isLike: boolean }>`
  flex-basis: 15px;
  display: flex;
  align-items: center;
  gap: 17px;
  color: #a5a5a5;
  font-size: 14px;

  & > div {
    display: flex;
    align-items: center;
    cursor: pointer;

    & > svg {
      margin-right: 2px;
      font-size: 15px;
      color: ${({ isLike }) => isLike && "red"};
      fill: ${({ isLike }) => isLike && "red"};
    }

    & > span {
      padding-top: 2px;
    }
  }
`;

interface Prop {
  replyId: string;
  replyBody: string;
  createdAt: string;
  user: {
    ninkname: string;
    email: string;
    image: string;
    userStatus: string;
    longitude: string;
    latitude: string;
    userRole: string;
  };
}

const ReplyCard = ({ replyId, replyBody, createdAt, user }: Prop) => {
  const [isLike, setIsLike] = useState(false);

  return (
    <SList>
      <SUtils>
        <SUserInfo>
          <img src={user.image} alt="profile" />
          <span>{user.ninkname}</span>
        </SUserInfo>
        <Dots
          deleteModalTitle="댓글을 삭제하시겠습니까?"
          onEdit={() => console.log(replyId)}
          onDelete={() => console.log(replyId)}
        />
      </SUtils>
      <SBody>{replyBody}</SBody>
      <SBottom isLike={isLike}>
        <span>{createdAt}</span>
        <div onClick={() => setIsLike((prev) => !prev)}>
          <HiOutlineHeart />
          <span>좋아요</span>
        </div>
      </SBottom>
    </SList>
  );
};

export default ReplyCard;
