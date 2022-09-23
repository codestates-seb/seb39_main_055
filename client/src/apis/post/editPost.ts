import { ThreadForm } from "../../types";
import { axiosInstance } from "../../utils";
import { threadImgTransformer } from "./submitNewPost";
import uploadImages from "./uploadImages";

const editPost = async (payload: ThreadForm) => {
  const { body, images, threadId } = payload;

  // 변경 사항 유무 여부 검사
  const imageURLs = await uploadImages(images);

  const { data } = await axiosInstance.patch(
    `/v1/user/thread/${threadId}`,
    { body, threadImages: imageURLs },
    {
      transformRequest: [threadImgTransformer],
      headers: {
        tokenNeeded: true,
      },
    }
  );

  return data;
};

export default editPost;
