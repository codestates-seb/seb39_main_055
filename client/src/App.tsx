import "react-toastify/dist/ReactToastify.css";

import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { fetchUserInfos, renewAccessToken } from "./apis";
import { Modal, SharedLayout } from "./components";
import { Main, Oauth } from "./pages";
import {
  initializeUserInfos,
  logOutUser,
  selectUser,
  useAppDispatch,
  useAppSelector,
} from "./redux";
import { PlaceRouter, PostRouter, SearchRouter, UserRouter } from "./Routers";
import { TokenErrorResponse, UserInfos } from "./types";
import { isTokenExpired } from "./utils";

const App = () => {
  const dispatch = useAppDispatch();
  const { loginStatus, accessToken, refreshToken } = useAppSelector(selectUser);

  // 메인 페이지 로드 후 로그인 상태 확인
  useQuery<UserInfos, AxiosError<TokenErrorResponse>>(
    ["userInfos", loginStatus],
    fetchUserInfos,
    {
      enabled: loginStatus,
      staleTime: 10 * 60 * 1000, // 10분
      refetchOnWindowFocus: false,
      /* refetchInterval: 1 * 60 * 1000, */
      retry: 2,
      onSuccess: (data) => {
        dispatch(initializeUserInfos(data));
      },
      onError: async (err) => {
        if (err.message !== "토큰 기한 만료") {
          dispatch(logOutUser());
        }
      },
      // 유저 정보 받아오고 나서 매번 토큰 만료 여부 확인
      onSettled: async () => {
        if (isTokenExpired(accessToken)) {
          await renewAccessToken(refreshToken);
        }
      },
    }
  );
  // 테스트
  return (
    <>
      <Modal width="600px" height="max-content" borderRadius="12px" background>
        <Routes>
          <Route path="/login/oauth" element={<Oauth />} />
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
