import { ThreadPostForm, ThreadPostRequest } from "../../types";
import { axiosInstance } from "../../utils";
import { isArrayOfString } from "../../utils/type-guards";
import uploadImages from "./uploadImages";

const threadImgTransformer = (data: ThreadPostRequest) => {
  const { threadImages } = data;
  let transformed = threadImages;

  if (isArrayOfString(threadImages)) {
    transformed = threadImages.map((url) => ({ image: url }));
  }

  data.threadImages = transformed;

  return data;
};

const submitPost = async (payload: ThreadPostForm) => {
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

export default submitPost;
