import { AxiosError } from "axios";
import { useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

import { initializeUserInfos, logInUser, useAppDispatch } from "../../redux";
import { axiosInstance, isKeyOf } from "../../utils";

interface LoginForm {
  email: string;
  password: string;
  keepLoggedIn: boolean;
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

interface ErrorResponse {
  error: string;
  path: string;
  status: number;
  timestamp: string;
}

const handleLogin = async ({ email, password }: LoginForm) => {
  const { headers } = await axiosInstance.post("/login", { email, password });
  const { authorization: token } = headers;

  return token;
};

export const fetchUserInfos = async () => {
  const { data } = await axiosInstance.get<UserInfosResponse>("/v1/user", {
    headers: {
      tokenNeeded: true,
    },
  });

  return data.data;
};

const ERROR_MESSAGE = {
  Unauthorized: "아이디 또는 비밀번호를 다시 확인해주세요.",
  Forbidden: "유효하지 않은 접근입니다.",
};

export default function useLogin() {
  const dispatch = useAppDispatch();
  const [errMsg, setErrMsg] = useState("");
  const { mutate, isLoading, isSuccess, isError } = useMutation<
    string,
    AxiosError<ErrorResponse>,
    LoginForm
  >((form) => handleLogin(form), {
    onSuccess: async (token, { keepLoggedIn }) => {
      dispatch(logInUser({ token, keepLoggedIn }));

      const userInfos = await fetchUserInfos();
      dispatch(initializeUserInfos(userInfos));
    },
    onError: async (data) => {
      const { response } = data;

      if (!response) {
        toast.error(data.message);
        return;
      }

      const serverMsg = response.data.error;

      if (isKeyOf(serverMsg, ERROR_MESSAGE)) {
        setErrMsg(ERROR_MESSAGE[serverMsg]);
      }
    },
  });

  return { mutate, isLoading, isSuccess, isError, errMsg };
}
