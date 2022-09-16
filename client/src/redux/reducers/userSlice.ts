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

export interface User {
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
      state.loginStatus = true;
    },
    setUserInfos: (state, { payload }: PayloadAction<UserInfos>) => {
      state.userInfos = { ...payload, hearts: [], threads: [] };
    },
  },
});

export const selectUserToken = (state: RootState) => state.user.token;

export const { setToken, setUserInfos } = userSlice.actions;
export const userReducer: Reducer<typeof initialState> = userSlice.reducer;
