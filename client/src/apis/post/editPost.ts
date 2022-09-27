import { ThreadForm, ThreadPostRequest } from "../../types";
import { axiosInstance, queryClient } from "../../utils";
import { threadImgTransformer } from "./submitNewPost";
import uploadImages from "./uploadImages";

const checkDifference = ({ body, images }: ThreadForm) => {
  const difference: Partial<ThreadPostRequest> = {};
  const initialPayload = queryClient.getQueryData("authUser");

  const isBodyModified = initialPayload !== body;
  const isImageModified = initialPayload !== body;

  if (isBodyModified) {
    difference.body = body;
  }
  if (isImageModified) {
    difference.threadImages = ["ff"];
  }

  return difference;
};

const editPost = async ({ body, images, threadId }: ThreadForm) => {
  // 변경 사항 유무 여부 검사
  const imageURLs = await uploadImages(images);
  const payload = checkDifference({ body, images });

  const { data } = await axiosInstance.patch(
    `/v1/user/thread/${threadId}`,
    payload,
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
