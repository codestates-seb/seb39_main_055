import { useNavigate } from "react-router-dom";

import { Dots } from "../../../../components";
import { PostData } from "../data";
import { SUserInfo, SUtils } from "./style";

interface Prop {
  threadId: string;
  threadImages: {
    image: string;
    threadImageId: string;
    threadImageStatus: string;
  }[];
  body: string;
  updatedAt: string;
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

const UserCard = ({ user, updatedAt, threadId, threadImages, body }: Prop) => {
  const navigate = useNavigate();

  return (
    <SUtils>
      <SUserInfo>
        <img src={user.image} alt="profile" />
        <span>{user.ninkname}</span>
        <span>{updatedAt}</span>
      </SUserInfo>
      <Dots
        deleteModalTitle="댕댕이 숲의 기록을 삭제하시겠습니까?"
        onEdit={() =>
          navigate("/post/edit", { state: { body, threadId, threadImages } })
        }
        onDelete={() => console.log("삭제")}
      />
    </SUtils>
  );
};

export default UserCard;
