export interface ThreadImages {
  file: Blob;
  uri: string;
  md5: string;
}

export interface ThreadImageResponse {
  image: string;
  threadImageId: number;
  threadImageStatus: string;
}

export interface ThreadPostForm {
  body: string;
  images: ThreadImages[];
}

export interface ThreadPostRequest {
  body: string;
  threadImages: { image: string }[] | string[];
}

export interface ThreadPostResponse {
  body: string;
  createdAt: string;
  likes: number;
  threadId: number;
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
