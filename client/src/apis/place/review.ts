import { Review } from "../../types";
import { axiosInstance } from "../../utils";

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
