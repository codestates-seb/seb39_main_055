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
  "user/initializeUserInfos": (storeAPI, next, action) => {
    const { keepLoggedIn, accessToken } = storeAPI.getState().user;

    if (!keepLoggedIn) return next(action);
    localStorage.setItem("currentUser", JSON.stringify(accessToken));
  },
  "user/logOutUser": () => {
    localStorage.removeItem("currentUser");
  },
  "user/changeLocationPermission": (storeAPI, next, action) => {
    const { payload } = action;

    localStorage.setItem("locationPermission", payload);
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
