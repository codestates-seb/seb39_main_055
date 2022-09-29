import { useState } from "react";
import { HiOutlineHeart } from "react-icons/hi";

import { Dots } from "../../../../components";
import { Reply } from "../../../../types";
import { SBody, SBottom, SList, SUserInfo, SUtils } from "./style";

interface Prop {
  reply: Reply;
}

const ReplyCard = ({ reply }: Prop) => {
  const [isLike, setIsLike] = useState(false);

  return (
    <SList>
      <SUtils>
        <SUserInfo>
          <img src={reply?.user.image} alt="profile" />
          <span>{reply?.user.nickname}</span>
        </SUserInfo>
        <Dots
          deleteModalTitle="댓글을 삭제하시겠습니까?"
          onEdit={() => console.log("수정")}
          onDelete={() => console.log("삭제")}
        />
      </SUtils>
      <SBody>{reply?.body}</SBody>
      <SBottom isLike={isLike}>
        <span>{reply?.updatedAt}</span>
        <div onClick={() => setIsLike((prev) => !prev)}>
          <HiOutlineHeart />
          <span>좋아요</span>
        </div>
      </SBottom>
    </SList>
  );
};

export default ReplyCard;
