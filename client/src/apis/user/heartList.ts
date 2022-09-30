import { Store } from "../../types";
import { Heart } from "../../types/heart";
import { axiosInstance } from "../../utils";

export const getHeartList = async (): Promise<Heart[]> => {
  const { data } = await axiosInstance.get(
    `v1/user/heart/list?page=1&size=100`,
    { headers: { tokenNeeded: true } }
  );
  return data.data;
};
