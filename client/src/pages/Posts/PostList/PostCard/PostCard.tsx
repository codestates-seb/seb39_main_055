import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";

import { NoResult } from "../../../../components";
import { Post } from "../../../../types";
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
          <span>{data?.updatedAt}</span>
        </SInfo>
        <SBody>
          <p>{parse(data?.body)}</p>
        </SBody>
        <SLike>
          <span>
            좋아요 <strong>{data?.likes}</strong>
          </span>
          <span>·</span>
          <span>
            {/* 댓글 <strong>{data?.replies.data.length}</strong> */}
            댓글 <strong>{0}</strong>
          </span>
        </SLike>
      </SMainContainer>
    </SCard>
  );
};

export default PostCard;
