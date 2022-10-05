import {
  AnyAction,
  Dispatch,
  Middleware,
  MiddlewareAPI,
} from "@reduxjs/toolkit";

import { RootState } from "..";
import { localStorageMW } from "./localStorage";

export interface CaseHandler {
  [x: string]: (
    storeAPI: MiddlewareAPI<Dispatch<AnyAction>, RootState>,
    next: Dispatch<AnyAction>,
    action: AnyAction
  ) => AnyAction | void;
}

const middlewares: Middleware[] = [];

middlewares.push(localStorageMW);

export default middlewares;
