/* eslint-disable consistent-return */
import {
  AnyAction,
  Dispatch,
  Middleware,
  MiddlewareAPI,
} from "@reduxjs/toolkit";

import { isKeyOf } from "../../../utils";
import { RootState } from "..";
import { CaseHandler } from ".";

function setTokens(
  storeAPI: MiddlewareAPI<Dispatch<AnyAction>, RootState>,
  next: Dispatch<AnyAction>,
  action: AnyAction
) {
  const { keepLoggedIn, accessToken, refreshToken } = storeAPI.getState().user;

  if (!keepLoggedIn) return next(action);
  localStorage.setItem(
    "currentUser",
    JSON.stringify(`${accessToken} .${refreshToken}`)
  );
}

const localStorageHandler: CaseHandler = {
  "user/initializeUserInfos": (storeAPI, next, action) =>
    setTokens(storeAPI, next, action),
  "user/renewUserTokens": (storeAPI, next, action) =>
    setTokens(storeAPI, next, action),
  "user/logOutUser": () => {
    localStorage.removeItem("currentUser");
  },
  "user/changeLocationPermission": (storeAPI, next, action) => {
    const { payload } = action;

    localStorage.setItem("locationPermission", payload);
  },
};

export const localStorageMW: Middleware<undefined, RootState> =
  (storeAPI) => (next) => (action) => {
    const { type } = action;

    if (isKeyOf(type, localStorageHandler)) {
      localStorageHandler[type](storeAPI, next, action);
    }

    return next(action);
  };
