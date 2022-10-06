import { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";

import { axiosInstance } from "../../utils";

interface ResignResponse {
  userId: number;
  nickname: string;
  email: string;
  image: string;
  userStatus: string;
  longitude: string;
  latitude: string;
  userRole: string;
}

export const resignUser = async (): Promise<ResignResponse> => {
  const { data } = await axiosInstance.patch(
    `/v1/user/update`,
    { userStatus: "USER_NOT_EXIST" },
    { headers: { tokenNeeded: true } }
  );
  return data.data;
};
