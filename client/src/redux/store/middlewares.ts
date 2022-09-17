/* eslint-disable consistent-return */
import {
  AnyAction,
  Dispatch,
  Middleware,
  MiddlewareAPI,
} from "@reduxjs/toolkit";

import { isKeyOf } from "../../utils";
import { RootState } from ".";

interface CaseHandler {
  [x: string]: (
    storeAPI: MiddlewareAPI<Dispatch<AnyAction>, RootState>,
    next: Dispatch<AnyAction>,
    action: AnyAction
  ) => AnyAction | void;
}

const middlewares: Middleware[] = [];

const localStorageHandler: CaseHandler = {
  "user/setUserInfos": (storeAPI, next, action) => {
    const { keepLoggedIn, token } = storeAPI.getState().user;

    if (!keepLoggedIn) return next(action);
    localStorage.setItem("currentUser", JSON.stringify(token));
  },
  "user/logOutUser": (storeAPI, next, action) => {
    localStorage.removeItem("currentUser");
  },
};

const localStorageMW: Middleware<undefined, RootState> =
  (storeAPI) => (next) => (action) => {
    const { type } = action;

    if (isKeyOf(type, localStorageHandler)) {
      localStorageHandler[type](storeAPI, next, action);
    }

    return next(action);
  };

middlewares.push(localStorageMW);

export default middlewares;
