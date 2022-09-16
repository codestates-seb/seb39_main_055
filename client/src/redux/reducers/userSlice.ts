import { createSlice, PayloadAction, Reducer } from "@reduxjs/toolkit";

import { RootState } from "../store";

interface UserInfos {
  nickname: string;
  userStatus: string;
  email: string;
  image: string;
  latitude: number;
  longitude: number;
  hearts?: unknown[];
  threads?: unknown[];
}

interface User {
  loginStatus: boolean;
  userInfos: UserInfos | null;
  keepLoggedIn: boolean;
  token: string;
}

const initialState: User = {
  loginStatus: false,
  keepLoggedIn: false,
  userInfos: null,
  token: "",
};

type LogInPayload = Pick<User, "token" | "keepLoggedIn">;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logInUser: (state, { payload }: PayloadAction<LogInPayload>) => {
      const { token, keepLoggedIn } = payload;

      if (keepLoggedIn) {
        state.keepLoggedIn = true;
      }
      state.token = token;
      state.loginStatus = true;
    },
    setUserInfos: (state, { payload }: PayloadAction<UserInfos>) => {
      state.userInfos = { ...payload, hearts: [], threads: [] };
    },
    logOutUser: () => {
      return initialState;
    },
  },
});

export const selectUserToken = (state: RootState) => state.user.token;

export const { logInUser, setUserInfos, logOutUser } = userSlice.actions;
export const userReducer: Reducer<typeof initialState> = userSlice.reducer;
