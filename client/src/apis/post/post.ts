import { PageInfo, Post, Reply, Thread } from "../../types";
import { axiosInstance } from "../../utils";

export const getPostList = async (
  pageParams: number
): Promise<{ data: Post; pageInfo: PageInfo; nextPage: number }> => {
  const { data } = await axiosInstance.get(
    `/v1/thread?page=${pageParams}&size=10&sort=createdAt`
  );

  return { data: data.data, pageInfo: data.pageInfo, nextPage: pageParams + 1 };
};

export const getPostDetail = async (postId: number): Promise<Thread> => {
  const { data } = await axiosInstance.get(
    `/v1/thread/${postId}?page=1&size=3&sort=createdAt`
  );
  return data.data;
};

export const deletePost = async (postId: number): Promise<Thread> => {
  const { data } = await axiosInstance.patch(
    `/v1/user/thread/delete/${postId}`,
    {},
    {
      headers: {
        tokenNeeded: true,
      },
    }
  );
  return data.data;
};

export const registerPostHeart = async (postId: number): Promise<Thread> => {
  const { data } = await axiosInstance.post(
    `/v1/user/likes/register`,
    { threadId: postId },
    {
      headers: { tokenNeeded: true },
    }
  );
  return data.data;
};

export const cancelPostHeart = async (postId: number): Promise<Thread> => {
  const { data } = await axiosInstance.patch(
    `/v1/user/likes/cancel`,
    { threadId: postId, likesStatus: "LIKES_NOT_EXIST" },
    {
      headers: { tokenNeeded: true },
    }
  );
  return data.data;
};

export const getInfiniteReply = async (
  postId: number,
  pageParams: number
): Promise<{ data: Thread; nextPage: number }> => {
  const { data } = await axiosInstance.get(
    `/v1/thread/${postId}?page=${pageParams}&size=3&sort=createdAt`
  );

  return { data: data.data, nextPage: pageParams + 1 };
};

export const registerReply = async (payload: {
  postId: number;
  body: string;
}): Promise<Reply> => {
  const { postId, body } = payload;
  const { data } = await axiosInstance.post(
    `/v1/user/reply/write?thread-id=${postId}`,
    { body },
    { headers: { tokenNeeded: true } }
  );
  return data.data;
};

export const editReply = async (payload: {
  replyId: number;
  body: string;
}): Promise<Reply> => {
  const { replyId, body } = payload;
  const { data } = await axiosInstance.patch(
    `/v1/user/reply/${replyId}`,
    { body },
    { headers: { tokenNeeded: true } }
  );
  return data.data;
};

export const deleteReply = async (replyId: number): Promise<Reply> => {
  const { data } = await axiosInstance.patch(
    `/v1/user/reply/delete/${replyId}`,
    { replyStatus: "REPLY_NOT_EXIST" },
    { headers: { tokenNeeded: true } }
  );
  return data.data;
};
