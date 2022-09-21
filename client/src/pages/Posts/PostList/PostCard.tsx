import styled from "styled-components";

import cat from "../../../assets/images/animal/cat.png";

export const SCard = styled.li`
  display: flex;
  gap: 80px;
  height: 280px;
  padding: 24px;
  border-radius: 17px;
  box-shadow: 1px 3px 10px hsla(0, 0%, 0%, 0.05),
    1px 2px 4px hsla(0, 0%, 0%, 0.05), 0 4px 8px hsla(0, 0%, 0%, 0.1);
  transition: all 0.4s;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }

  @media screen and (max-width: 800px) {
    flex-direction: column;
    gap: 20px;
    height: 600px;
  }
`;

export const SImgContainer = styled.section`
  border-radius: 17px;
  flex-basis: 260px;

  & > img {
    width: 260px;
    height: 100%;
    border-radius: 17px;
    object-fit: cover;
  }

  @media screen and (max-width: 800px) {
    width: 100%;
    height: 60%;

    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

export const SMainContainer = styled.section`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
`;

export const SInfo = styled.div`
  flex-basis: 20%;
  display: flex;
  align-items: center;
  gap: 13px;

  & > img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
  }

  & > span:nth-child(2) {
    color: #000000;
    font-size: 20px;
    font-weight: bold;
  }

  & > span:nth-child(3) {
    color: #bdbdbd;
    font-size: 18px;
  }
`;

export const SBody = styled.div`
  flex-basis: 60%;
  display: flex;
  align-items: center;
  font-size: 18px;
  color: #161616;
  overflow: hidden;
  line-height: 30px;
`;

export const SLike = styled.div`
  flex-basis: 20%;
  display: flex;
  align-items: center;
  gap: 13px;

  & > span {
    color: #bdbdbd;
    font-size: 14px;

    & > strong {
      color: #ffc107;
    }
  }
`;

const PostCard = () => {
  return (
    <SCard>
      <SImgContainer>
        <img src={cat} alt="cat" />
      </SImgContainer>
      <SMainContainer>
        <SInfo>
          <img src={cat} alt="profile" />
          <span>멍멍냥</span>
          <span>30분 전</span>
        </SInfo>
        <SBody>
          <p>
            발톱전용으로 하는데 너무 힘들어서 조언 부탁드려요 ㅠㅠㅠㅠ 어디까지
            잘라야하는지 모르겠어요 초보 집사여서ㅠㅠㅠㅠㅠㅠㅠ 어떻게 잡고
            어떻게 잘라야 하는지 친절히 알려주실 분 댓글 달아주시면 ...
          </p>
        </SBody>
        <SLike>
          <span>
            좋아요 <strong>10</strong>
          </span>
          <span>·</span>
          <span>
            좋아요 <strong>10</strong>
          </span>
        </SLike>
      </SMainContainer>
    </SCard>
  );
};

export default PostCard;
