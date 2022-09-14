import axios, {
  AxiosRequestTransformer,
  AxiosResponseTransformer,
} from "axios";

export const authHeader = (thunkAPI: any) => {
  return {
    headers: {
      authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
    },
  };
};

export const axiosInstance = axios.create({
  baseURL: "http://soyoungp.shop", // 서버 url
  timeout: 5000,
  transformRequest: [
    ...(axios.defaults.transformRequest as AxiosRequestTransformer[]),
  ],
  transformResponse: [
    ...(axios.defaults.transformResponse as AxiosResponseTransformer[]),
  ],
});
