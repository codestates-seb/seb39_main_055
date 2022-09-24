import { Dots } from "../../../../components";
import { SUserInfo, SUtils } from "./style";

interface Prop {
  threadId: string;
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

const UserCard = ({ threadId, user, updatedAt }: Prop) => {
  return (
    <SUtils>
      <SUserInfo>
        <img src={user.image} alt="profile" />
        <span>{user.ninkname}</span>
        <span>{updatedAt}</span>
      </SUserInfo>
      <Dots
        name="댕댕이숲"
        onEdit={() => console.log("수정")}
        onDelete={() => console.log("삭제")}
      />
    </SUtils>
  );
};

export default UserCard;
