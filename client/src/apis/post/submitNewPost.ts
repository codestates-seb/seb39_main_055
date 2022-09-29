import { ThreadForm, ThreadPostRequest } from "../../types";
import { axiosInstance, isArrayOfString } from "../../utils";
import uploadImages from "./uploadImages";

export const threadImgTransformer = (data: ThreadPostRequest) => {
  const { threadImages } = data;
  let transformed = threadImages;

  if (isArrayOfString(threadImages)) {
    transformed = threadImages.map((url) => ({ image: url }));
  }

  data.threadImages = transformed;

  return data;
};

const submitNewPost = async (payload: ThreadForm) => {
  const { body, images } = payload;

  const imageURLs = await uploadImages(images);

  const { data } = await axiosInstance.post(
    "/v1/user/thread/write",
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

export default submitNewPost;
