import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";

import { deleteReply, editReply } from "../../../../apis";
import { Dots } from "../../../../components";
import { useAppSelector } from "../../../../redux";
import { Reply } from "../../../../types";
import { getDateToString } from "../../../../utils";
import PostForm from "../PostForm/PostForm";
import { SBody, SList, SUserInfo, SUtils } from "./style";

interface Prop {
  reply: Reply;
}

const ReplyCard = ({ reply }: Prop) => {
  const params = useParams();
  const queryClient = useQueryClient();
  const [isEdit, setIsEdit] = useState(false);
  const { userInfos } = useAppSelector((state) => state.user);

  const { mutate: deleteReplyMutate } = useMutation(deleteReply, {
    onSuccess: () => queryClient.invalidateQueries(["post", params.id]),
  });

  const { mutate: editReplyMutate } = useMutation(editReply, {
    onSuccess: () => queryClient.invalidateQueries(["post", params.id]),
  });

  return (
    <SList>
      <SUtils>
        <SUserInfo>
          <img src={reply?.user.image} alt="profile" />
          <span>{reply?.user.nickname}</span>
          <span>{getDateToString(reply?.updatedAt)}</span>
        </SUserInfo>
        {userInfos?.userId === reply.user.userId && (
          <Dots
            deleteModalTitle="댓글을 삭제하시겠습니까?"
            onEdit={() => setIsEdit(true)}
            onDelete={() => deleteReplyMutate(reply?.replyId)}
          />
        )}
      </SUtils>
      <SBody>
        {isEdit ? (
          <PostForm
            isEdit
            setIsEdit={setIsEdit}
            body={reply?.body}
            submitCallback={(body) =>
              editReplyMutate({ body, replyId: reply?.replyId })
            }
          />
        ) : (
          reply?.body
        )}
      </SBody>
    </SList>
  );
};

export default ReplyCard;
