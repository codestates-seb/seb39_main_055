import { Location, useLocation } from "react-router-dom";

import { editPost } from "../../../apis";
import PostForms from "../../../components/PostForms/PostForms";
import { ThreadPostResponse } from "../../../types";

type ThreadPartialData = Pick<ThreadPostResponse, "body" | "threadImages">;

interface LocationWithState extends Location {
  state: ThreadPartialData;
}

function threadDataTransfromer({ body, threadImages }: ThreadPartialData) {
  const transformedImgs = threadImages.map(({ image }) => ({
    file: null,
    uri: image,
    id: image, // 이미지 md5를 직접 계산하기에는 성능 저하 우려가 있어 url로 대신 사용
  }));

  return { body, threadImages: transformedImgs };
}

const EditPost = () => {
  const { state } = useLocation() as LocationWithState;
  const { body, threadImages } = threadDataTransfromer(state);

  return (
    <PostForms
      buttonText="수정하기"
      mutation={editPost}
      body={body}
      threadImages={threadImages}
    />
  );
};

export default EditPost;
