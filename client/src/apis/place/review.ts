import { Review, Store } from "../../types";
import { axiosInstance } from "../../utils";

export const getInfiniteReview = async (
  storeId: string,
  sortOption: string,
  pageParams: number
): Promise<{ data: Store; nextPage: number }> => {
  const { data } = await axiosInstance.get(
    `v1/store/${storeId}?page=${pageParams}&size=3&sort=${sortOption}`
  );

  return { data: data.data, nextPage: pageParams + 1 };
};

export const addReview = async (payload: {
  storeId: string;
  body: string;
  score: number;
}): Promise<Review> => {
  const { storeId, body, score } = payload;

  const { data } = await axiosInstance.post(
    `/v1/user/review/write?store-id=${storeId}`,
    { body, score },
    { headers: { tokenNeeded: true } }
  );

  return data.data;
};

export const deleteReview = async (reviewId: string): Promise<Review> => {
  const { data } = await axiosInstance.patch(
    `v1/user/review/update/${reviewId}`,
    { reviewStatus: "REVIEW_NOT_EXIST" },
    { headers: { tokenNeeded: true } }
  );

  return data.data;
};

export const editReview = async (payload: {
  reviewId: string;
  body: string;
  score: number;
}): Promise<Review> => {
  const { reviewId, body, score } = payload;

  const { data } = await axiosInstance.patch(
    `v1/user/review/update/${reviewId}`,
    { body, score },
    { headers: { tokenNeeded: true } }
  );

  return data.data;
};
