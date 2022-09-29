import { Thread } from "../../types";
import { axiosInstance } from "../../utils";

export const getPostDetail = async (postId: number): Promise<Thread> => {
  const { data } = await axiosInstance.get(
    `/v1/thread/${postId}?page=1&size=100&sort=createdAt`
  );
  return data.data;
};

export const deletePost = async (postId: number): Promise<Thread> => {
  const { data } = await axiosInstance.patch(`/v1/user/thread/${postId}`, {
    headers: {
      tokenNeeded: true,
    },
  });
  return data.data;
};
