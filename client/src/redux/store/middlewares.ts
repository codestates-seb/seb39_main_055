import { Middleware } from "@reduxjs/toolkit";

import { RootState } from ".";

const middlewares: Middleware[] = [];

/* const handleCase = {
  "user/setUserInfos": () => {

  },
  "user/logOutUser": () => {
    localStorage.removeItem("currentUser");
  },
}; */
const localStorageMW: Middleware<undefined, RootState> =
  (storeAPI) => (next) => (action) => {
    if (action.type === "user/setUserInfos") {
      const { keepLoggedIn, token } = storeAPI.getState().user;

      if (!keepLoggedIn) return next(action);
      localStorage.setItem("currentUser", JSON.stringify(token));
    } else if (action.type === "user/logOutUser") {
      localStorage.removeItem("currentUser");
    }
    return next(action);
  };

middlewares.push(localStorageMW);

export default middlewares;
