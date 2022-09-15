import axios, {
  AxiosRequestTransformer,
  AxiosResponseTransformer,
} from "axios";

import { store } from "..";

export const axiosInstance = axios.create({
  baseURL: "https://soyoungp.shop", // 서버 url
  timeout: 5000,
  transformRequest: [
    // 요청 보내기 전에 token 설정
    (data, headers) => {
      if (!headers?.tokenNeeded) return data;

      const { user } = store.getState();

      if (!user.token) {
        throw new Error(
          "Authentication Failed. Check whether you are logged-in."
        );
      }
      delete headers.tokenNeeded;
      headers.Authorization = user.token;

      return data;
    },
    ...(axios.defaults.transformRequest as AxiosRequestTransformer[]),
  ],
  transformResponse: [
    ...(axios.defaults.transformResponse as AxiosResponseTransformer[]),
  ],
});
