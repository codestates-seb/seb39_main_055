/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios, {
  AxiosRequestConfig,
  AxiosRequestTransformer,
  AxiosResponseTransformer,
} from "axios";

import { store } from "..";

export type ReqTransformer = AxiosRequestTransformer[];
export type ResTransformer = AxiosResponseTransformer[];

export const axiosInstance = axios.create({
  baseURL: "https://soyoungp.shop", // 서버 url
  timeout: 5000,
  transformResponse: [...(axios.defaults.transformResponse as ResTransformer)],
});

function defaultTransformerCheck(config: AxiosRequestConfig) {
  const reqTransformer = config.transformRequest;

  if (!Array.isArray(reqTransformer)) {
    throw new Error("axios.config에 transformer가 존재하지 않습니다.");
  }
  // 부주의로 제거된 default transformer(헤더 설정, JSON 변환 등) 복구
  if (reqTransformer.at(-1)!.name !== "transformRequest") {
    config.transformRequest = [
      ...reqTransformer,
      ...(axios.defaults.transformRequest as ReqTransformer),
    ];
  }
}

// 요청 보내기 전에 token 설정 - "tokenNeeded: true" 헤더 이용
function authorizationSetter(config: AxiosRequestConfig) {
  const header = config.headers!;

  if (!header?.tokenNeeded) return config;

  const { user } = store.getState();

  if (!user.token) {
    throw new Error(
      "유저 인증 정보가 존재하지 않습니다. 토큰을 보내기 전에 로그인 상태를 확인하세요."
    );
  }

  delete header.tokenNeeded;
  header.Authorization = user.token;

  return config;
}

axiosInstance.interceptors.request.use((config) => {
  defaultTransformerCheck(config);

  return authorizationSetter(config);
});
