import {
  SBody,
  SCard,
  SImgContainer,
  SInfo,
  SLike,
  SMainContainer,
} from "./styled";

interface Prop {
  postImage: {
    threadImageId: string;
    image: string;
    threadImageStatus: string;
  }[];
  userImage: string;
  nickName: string;
  updatedAt: string;
  body: string;
  likes: number;
  comments: number;
}

const PostCard = ({
  postImage,
  userImage,
  nickName,
  updatedAt,
  body,
  likes,
  comments,
}: Prop) => {
  return (
    <SCard>
      <SImgContainer>
        {/** 빈 배열일 경우 기본 이미지로 수정 */}
        <img src={postImage[0].image} alt="cat" />
      </SImgContainer>
      <SMainContainer>
        <SInfo>
          <img src={userImage} alt="profile" />
          <span>{nickName}</span>
          <span>{updatedAt}</span>
        </SInfo>
        <SBody>
          <p>{body}</p>
        </SBody>
        <SLike>
          <span>
            좋아요 <strong>{likes}</strong>
          </span>
          <span>·</span>
          <span>
            댓글 <strong>{comments}</strong>
          </span>
        </SLike>
      </SMainContainer>
    </SCard>
  );
};

export default PostCard;
