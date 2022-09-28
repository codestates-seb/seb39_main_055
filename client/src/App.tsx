import "react-toastify/dist/ReactToastify.css";

import { useQuery } from "react-query";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { fetchUserInfos } from "./apis/user/login";
import { Modal, SharedLayout } from "./components";
import { Login, Main, Mypage, Signup } from "./pages";
import EditMyInfos from "./pages/Mypage/EditMyInfos/EditMyInfos";
import {
  initializeUserInfos,
  logOutUser,
  selectUser,
  useAppDispatch,
  useAppSelector,
} from "./redux";
import { PlaceRouter, PostRouter, SearchRouter, UserRouter } from "./Routers";

const App = () => {
  const dispatch = useAppDispatch();
  const { loginStatus } = useAppSelector(selectUser);

  // 메인 페이지 로드 후 로그인 상태 확인
  useQuery(["authUser", loginStatus], fetchUserInfos, {
    enabled: loginStatus,
    staleTime: 6 * 60 * 1000, // 6시간
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      dispatch(initializeUserInfos(data));
    },
    onError: (err) => {
      console.log(err);
      dispatch(logOutUser());
    },
  });

  console.log("loginStatus 상태 확인", loginStatus);

  return (
    <>
      <Modal width="600px" height="max-content" borderRadius="3px" background>
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
