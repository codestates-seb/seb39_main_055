import { PageInfo } from "./store";
import { UserInfos } from "./user";

export interface Thread {
  threadId: number;
  createdAt: string;
  updatedAt: string;
  threadStatus: "THREAD_EXIST" | "THREAD_NOT_FOUND";
  body: string;
  user: UserInfos;
  threadImages: ThreadImageResponse[];
  replies: { data: Reply[]; pageInfo: PageInfo };
  likesUserId: number[];
}

export interface Reply {
  replyId: number;
  replyStatus: "REPLY_EXIST" | "REPLY_NOT_FOUND";
  body: string;
  user: UserInfos;
  threadId: number;
  createdAt: string;
  updatedAt: string;
}

export interface ThreadImages {
  file: Blob | null; // 서버에서 받아온 이미지: null
  uri: string;
  id: string;
}

export interface ThreadImageResponse {
  image: string;
  threadImageId: number;
  threadImageStatus: string;
}

// 새 thread 작성
export interface ThreadForm {
  body: string;
  images: ThreadImages[];
  threadId?: number;
}

export interface ThreadPostRequest {
  body: string;
  threadImages: { image: string }[] | string[];
}

export interface ThreadPostResponse {
  body: string;
  createdAt: string;
  likes: number;
  threadId?: number;
  threadImages: ThreadImageResponse[];
  threadStatus: string;
  updatedAt: string;
}

export interface ThreadErrorResponse {
  fieldErrors: null;
  message: string;
  status: number;
  violationErrors: null;
}
