import { Location, useLocation } from "react-router-dom";

import { editPost } from "../../../apis";
import PostForms from "../../../components/PostForms/PostForms";
import { ThreadPostResponse } from "../../../types";

type ThreadPartialData = Pick<
  ThreadPostResponse,
  "body" | "threadImages" | "threadId"
>;

interface LocationWithState extends Location {
  state: ThreadPartialData;
}

function threadDataTransfromer({
  body,
  threadImages,
  threadId,
}: ThreadPartialData) {
  const transformedImgs = threadImages.map(({ image }) => ({
    file: null,
    uri: image,
    id: image, // 서로 다른 이미지가 하나의 AWS url로 대응되지 않기 때문에 별도의 계산이 필요한 md5 대신 사용
  }));

  return { body, threadImages: transformedImgs, threadId };
}

const EditPost = () => {
  // PostDetail에서 navigate()에서 state로 넘겨준 데이터 사용
  const { state } = useLocation() as LocationWithState;
  const { body, threadImages, threadId } = threadDataTransfromer(state);

  return (
    <PostForms
      buttonText="수정하기"
      mutation={editPost}
      body={body}
      threadImages={threadImages}
      threadId={threadId}
    />
  );
};

export default EditPost;
