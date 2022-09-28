import { Store } from "../../types";
import { axiosInstance } from "../../utils";

export const registerHeart = async (storeId: string): Promise<Store> => {
  const { data } = await axiosInstance.post(
    "/v1/user/heart/register",
    { storeId },
    { headers: { tokenNeeded: true } }
  );
  return data.data;
};

export const cancelHeart = async (storeId: string): Promise<Store> => {
  const { data } = await axiosInstance.patch(
    "/v1/user/heart/cancel",
    {
      storeId,
      heartStatus: "HEART_NOT_EXIST",
    },
    { headers: { tokenNeeded: true } }
  );
  return data.data;
};
