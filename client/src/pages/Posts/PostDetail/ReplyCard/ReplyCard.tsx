import { useState } from "react";
import { HiOutlineHeart } from "react-icons/hi";

import { Dots } from "../../../../components";
import { SBody, SBottom, SList, SUserInfo, SUtils } from "./style";

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
