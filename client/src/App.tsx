import "react-toastify/dist/ReactToastify.css";

import { useQuery } from "react-query";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { fetchUserInfos } from "./apis/user/login";
import { SharedLayout } from "./components";
import PlaceCard from "./components/Main/HotPlace/PlaceCard/PlaceCard";
import { Login, Main, Mypage, NewPost, RegisterPlace, Signup } from "./pages";
import {
  logOutUser,
  selectUser,
  setUserInfos,
  useAppDispatch,
  useAppSelector,
} from "./redux";

const App = () => {
  const dispatch = useAppDispatch();
  const { loginStatus } = useAppSelector(selectUser);
  const InitQuery = useQuery(["authUser", loginStatus], fetchUserInfos, {
    enabled: loginStatus,
    onSuccess: (data) => {
      dispatch(setUserInfos(data));
    },
    onError: () => {
      dispatch(logOutUser());
    },
  });

  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/place/new" element={<RegisterPlace />} />
          <Route path="/post/new" element={<NewPost />} />
        </Route>
      </Routes>
      <ToastContainer position="top-center" pauseOnFocusLoss theme="colored" />
    </>
  );
};

// post/new
// post/edit
// post/list
// post/detail

export default App;
