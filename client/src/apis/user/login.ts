/* eslint-disable consistent-return */
import { AxiosError } from "axios";
import { useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

import { store } from "../..";
import {
  initializeUserInfos,
  logInUser,
  logOutUser,
  renewUserTokens,
  useAppDispatch,
} from "../../redux";
import { ErrorResponse, UserInfos } from "../../types";
import { axiosInstance, isKeyOf } from "../../utils";

interface LoginForm {
  email: string;
  password: string;
  keepLoggedIn: boolean;
}

interface UserInfosResponse {
  data: UserInfos;
}

interface TokenRenewResponse {
  data: { accessToken: string };
}

export const renewAccessToken = async (refreshToken: string) => {
  const { dispatch } = store;

  try {
    const {
      data: { data },
    } = await axiosInstance.post<TokenRenewResponse>("/v1/token-refresh", {
      refreshToken,
    });
    const { accessToken } = data;

    dispatch(renewUserTokens({ accessToken }));

    return accessToken;
  } catch (err) {
    toast.error("로그인 세션이 만료되었습니다. 다시 로그인 해주세요.");
    dispatch(logOutUser());
  }
};

const handleLogin = async ({ email, password }: LoginForm) => {
  const { headers } = await axiosInstance.post("/login", { email, password });
  const { authorization: accessToken, refresh: refreshToken } = headers;

  return { accessToken, refreshToken };
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
    { accessToken: string; refreshToken: string },
    AxiosError<ErrorResponse>,
    LoginForm
  >((form) => handleLogin(form), {
    onSuccess: async ({ accessToken, refreshToken }, { keepLoggedIn }) => {
      dispatch(logInUser({ accessToken, refreshToken, keepLoggedIn }));

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
