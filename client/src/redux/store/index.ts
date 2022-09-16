/* eslint-disable no-bitwise */
import {
  combineReducers,
  configureStore,
  Middleware,
  PreloadedState,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { userReducer } from "../reducers";

const middlewares: Middleware[] = [];
const localStorageMW: Middleware<undefined, RootState> =
  (storeAPI) => (next) => (action) => {
    if (action.type === "user/setUserInfos") {
      const { token } = storeAPI.getState().user;

      localStorage.setItem("currentUser", JSON.stringify(token));
    }
    return next(action);
  };

middlewares.push(localStorageMW);

const rootReducer = combineReducers({
  user: userReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(middlewares),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type CreateAsyncThunkTypes = {
  dispatch: AppDispatch;
  state: RootState;
  rejectValue: string;
};
