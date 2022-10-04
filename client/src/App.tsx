import "react-toastify/dist/ReactToastify.css";

import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { fetchUserInfos } from "./apis/user/login";
import { Modal, SharedLayout } from "./components";
import { Main } from "./pages";
import {
  initializeUserInfos,
  logOutUser,
  selectUser,
  useAppDispatch,
  useAppSelector,
} from "./redux";
import { PlaceRouter, PostRouter, SearchRouter, UserRouter } from "./Routers";
import { TokenErrorResponse, UserInfos } from "./types";
import { axiosInstance } from "./utils";

const payload =
  "eyJ1c2VyUm9sZSI6IlJPTEVfVVNFUiIsInVzZXJJZCI6MjcsImVtYWlsIjoia3NoZWVyNTA2QG5hdmVyLmNvbSIsInN1YiI6IjI3IiwiaWF0IjoxNjY0ODYyOTMwLCJleHAiOjE2NjUxMjIxMzB9";
// console.log(atob(payload));
// console.log(Math.floor(Date.now() / 1000));

const App = () => {
  const dispatch = useAppDispatch();
  const { loginStatus, refreshToken } = useAppSelector(selectUser);

  // 메인 페이지 로드 후 로그인 상태 확인
  const { error } = useQuery<UserInfos, AxiosError<TokenErrorResponse>>(
    ["userInfos", loginStatus],
    fetchUserInfos,
    {
      enabled: loginStatus,
      staleTime: 10 * 60 * 1000, // 10분
      refetchOnWindowFocus: false,
      refetchInterval: 1 * 60 * 1000,
      retry: 2,
      onSuccess: (data) => {
        dispatch(initializeUserInfos(data));
      },
      onError: async (err) => {
        // dispatch(logOutUser());
        if (err.message === "토큰 기한 만료") {
          const { data } = await axiosInstance.post("/v1/token-refresh", {
            refreshToken,
          });
          console.log("refresh 토큰", data);
        }
      },
    }
  );

  /* useQuery(
    ["userInfos", "tokenExpired", error],
    async () => {
      if (!error) return;
      if (error.message === "토큰 기한 만료") {
        const { data } = await axiosInstance.post("/v1/token-refresh");
      }
      console.log(error.message);
    },
    {
      enabled: !!error,
      staleTime: 10 * 1000, // 6시간
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        "f";
      },
      onError: () => {
        dispatch(logOutUser());
      },
    }
  ); */

  return (
    <>
      <Modal width="600px" height="max-content" borderRadius="12px" background>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Main />} />
            <Route path="/*" element={<UserRouter />} />
            <Route path="/place/*" element={<PlaceRouter />} />
            <Route path="/post/*" element={<PostRouter />} />
            <Route path="/search/*" element={<SearchRouter />} />
            <Route path="/not-found" element={<div>NOT FOUND</div>} />
          </Route>
        </Routes>
      </Modal>
      <ToastContainer position="top-center" pauseOnFocusLoss theme="colored" />
    </>
  );
};

export default App;
