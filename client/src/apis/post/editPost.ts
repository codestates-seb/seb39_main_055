import { ThreadForm, ThreadPostRequest, ThreadPostResponse } from "../../types";
import { axiosInstance, queryClient } from "../../utils";
import { threadImgTransformer } from "./submitNewPost";
import uploadImages from "./uploadImages";

const checkDifference = (
  { body, threadImages }: ThreadPostRequest,
  threadId: number
) => {
  const difference: Partial<ThreadPostRequest> = {};
  const cachedPayload = queryClient.getQueryData<ThreadPostResponse>([
    "post",
    `${threadId}`,
  ]);

  const isImageModified =
    cachedPayload?.threadImages.length !== threadImages.length ||
    cachedPayload?.threadImages.some(
      ({ threadImage }, i) => threadImage !== threadImages[i]
    );
  const isBodyModified = cachedPayload?.body !== body;

  if (isBodyModified) {
    difference.body = body;
  }
  if (isImageModified) {
    difference.threadImages = threadImages;
  }

  return difference;
};

const editPost = async ({ body, images, threadId }: ThreadForm) => {
  if (!threadId) {
    throw new Error("threadId 정보가 없습니다.");
  }

  const imageURLs = await uploadImages(images);
  const payload = checkDifference({ body, threadImages: imageURLs }, threadId);

  // 변경 사항이 없을 경우 API 요청 없이 threadId만 반환해 /post/${threadId}로 리다이렉트 할 수 있도록 함
  if (!Object.keys(payload).length) return { data: { threadId } };

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
