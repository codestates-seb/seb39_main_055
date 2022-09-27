import { Store } from "../../types";
import { axiosInstance } from "../../utils";

export const getPlaceDetail = async (storeId: string): Promise<Store> => {
  console.log(storeId);
  const { data } = await axiosInstance.get(
    `v1/store/${storeId}?page=1&size=1&sort=createdAt`
  );
  console.log(data);
  return data.data;
};
