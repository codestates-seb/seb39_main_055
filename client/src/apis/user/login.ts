import { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "react-query";

import { setToken, setUserInfos, useAppDispatch } from "../../redux";
import { axiosInstance } from "../../utils";

interface LoginForm {
  email: string;
  password: string;
}

interface UserInfosResponse {
  data: {
    nickname: string;
    userStatus: string;
    email: string;
    image: string;
    latitude: number;
    longitude: number;
  };
}

export default function useLogin() {
  const dispatch = useAppDispatch();
  const { mutate, isLoading, isSuccess, isError } = useMutation<
    AxiosResponse<"">,
    AxiosError,
    LoginForm
  >((form) => axiosInstance.post("/login", form), {
    onSuccess: async ({ headers }) => {
      const { authorization } = headers;
      const { data } = await axiosInstance.get<UserInfosResponse>("/v1/user", {
        headers: {
          authorization,
        },
      });

      dispatch(setToken(authorization));
      dispatch(setUserInfos(data.data));
    },
  });

  return { mutate, isLoading, isSuccess, isError };
}
