import "react-toastify/dist/ReactToastify.css";

import { useQuery } from "react-query";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { fetchUserInfos } from "./apis/user/login";
import { SharedLayout } from "./components";
import { Login, Main, Signup } from "./pages";
import {
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
    /* onError: (err) => {}, */
  });

  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
      <ToastContainer position="top-center" pauseOnFocusLoss theme="colored" />
    </>
  );
};

export default App;
