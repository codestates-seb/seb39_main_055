import { axiosInstance } from "../../utils";

interface DeletePostResponse {
  threadId: string;
  threadStatus: string;
  body: string;
  likes: number;
  user: {
    ninkname: string;
    email: string;
    image: string;
    userStatus: string;
    longitude: string;
    latitude: string;
    userRole: string;
  };
  threadImages: {
    threadImageId: string;
    image: string;
    threadImageStatus: string;
  }[];
  createdAt: string;
  updatedAt: string;
  replyList: {
    replyId: string;
    replyBody: string;
    createdAt: string;
    user: {
      ninkname: string;
      email: string;
      image: string;
      userStatus: string;
      longitude: string;
      latitude: string;
      userRole: string;
    };
  }[];
}

export const deletePost = async (
  postId: string
): Promise<DeletePostResponse> => {
  const { data } = await axiosInstance.patch(`v1/user/thread/${postId}`, {
    headers: {
      tokenNeeded: true,
    },
  });
  return data.data;
};
