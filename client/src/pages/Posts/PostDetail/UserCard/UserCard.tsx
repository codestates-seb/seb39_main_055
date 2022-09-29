import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import { deletePost } from "../../../../apis";
import { Dots } from "../../../../components";
import { Thread } from "../../../../types";
import { SUserInfo, SUtils } from "./style";

interface Prop {
  data: Thread | undefined;
}

const UserCard = ({ data }: Prop) => {
  const navigate = useNavigate();
  // const { mutate } = useMutation(() => deletePost(threadId), {
  //   onSuccess: () => navigate("/post/list"),
  //   onError: () => console.log("에러"),
  // });

  return (
    <SUtils>
      <SUserInfo>
        <img src={data?.user.image} alt="profile" />
        <span>{data?.user.nickname}</span>
        <span>{data?.updatedAt}</span>
      </SUserInfo>
      <Dots
        deleteModalTitle="댕댕이 숲의 기록을 삭제하시겠습니까?"
        onEdit={() =>
          navigate("/post/edit", {
            state: {
              body: data?.body,
              threadId: data?.threadId,
              threadImages: data?.threadImages,
            },
          })
        }
        onDelete={() => console.log("delete")}
      />
    </SUtils>
  );
};

export default UserCard;
