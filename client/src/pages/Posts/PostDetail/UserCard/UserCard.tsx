import { TbDots } from "react-icons/tb";
import styled from "styled-components";

export const SUtils = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 45px 0 50px 0;

  svg {
    font-size: 50px;
    color: #a5a5a5;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      color: #161616;
    }
  }
`;

export const SUserInfo = styled.section`
  display: flex;
  align-items: center;
  gap: 15px;
  font-family: "Noto Sans KR", sans-serif;

  & > img {
    width: 68px;
    height: 68px;
    border-radius: 50%;
    object-fit: cover;
  }

  & > span:nth-child(2) {
    font-size: 20px;
    color: #161616;
    font-weight: 600;
  }

  & > span:nth-child(3) {
    font-size: 18px;
    color: #a5a5a5;
  }
`;

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
      {/** 클릭시 모달창 */}
      <TbDots />
    </SUtils>
  );
};

export default UserCard;
