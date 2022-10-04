import { UserInfos } from "../../types";
import { axiosInstance } from "../../utils";

export const getUserInfos = async (token: string): Promise<UserInfos> => {
  const { data } = await axiosInstance.get("/v1/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.data;
};
