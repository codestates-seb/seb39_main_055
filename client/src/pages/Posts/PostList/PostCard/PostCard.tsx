import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";

import { NoResult } from "../../../../components";
import {
  Post,
  Reply,
  Thread,
  ThreadImages,
  User,
  UserInfos,
} from "../../../../types";
import { getDateToString } from "../../../../utils";
import {
  SBody,
  SCard,
  SImgContainer,
  SInfo,
  SLike,
  SMainContainer,
} from "./styled";

interface Prop {
  data: Post;
}

const PostCard = ({ data }: Prop) => {
  const navigate = useNavigate();
  console.log(data);
  return (
    <SCard onClick={() => navigate(`/post/${data?.threadId}`)}>
      <SImgContainer>
        {data?.threadImages.length ? (
          <img src={data?.threadImages[0].image} alt="unknown" />
        ) : (
          <NoResult title="설정한 대표 이미지가 없습니다." height="100%" />
        )}
      </SImgContainer>
      <SMainContainer>
        <SInfo>
          <img src={data?.user.image} alt="profile" />
          <span>{data?.user.nickname}</span>
          <span>{getDateToString(data?.updatedAt)}</span>
        </SInfo>
        <SBody>
          <div>{parse(data?.body)}</div>
        </SBody>
        <SLike>
          <span>
            좋아요 <strong>{data?.likesUserId.length}</strong>
          </span>
          <span>·</span>
          <span>
            댓글 <strong>{data?.replies.length}</strong>
          </span>
        </SLike>
      </SMainContainer>
    </SCard>
  );
};

export default PostCard;
