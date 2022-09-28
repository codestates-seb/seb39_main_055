import { createSlice, PayloadAction, Reducer } from "@reduxjs/toolkit";

import { User, UserInfos } from "../../types";
import { RootState } from "../store";

const initialUserInfos: UserInfos = {
  userId: -1,
  nickname: "",
  userStatus: "",
  userRole: "ROLE_USER",
  email: "",
  image: "",
  latitude: 0,
  longitude: 0,
};

const initialUser: User = {
  loginStatus: false,
  keepLoggedIn: false,
  userInfos: null,
  token: "",
};

/* function removeOptionals<T>(obj): obj is NonNullable<T> {
  const filtered = {};
  Object.entries(obj).filter(([key, value]) => {
    if (value === undefined) return false;
    return true;
  });
} */

type LogInPayload = Pick<User, "token" | "keepLoggedIn">;

const userSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {
    logInUser: (state, { payload }: PayloadAction<LogInPayload>) => {
      const { token, keepLoggedIn } = payload;

      if (keepLoggedIn) {
        state.keepLoggedIn = true;
      }
      state.token = token;
      state.loginStatus = true;
    },
    initializeUserInfos: (state, { payload }: PayloadAction<UserInfos>) => {
      state.userInfos = { ...payload, hearts: [], threads: [] };
    },
    changeUserNickname: (state, { payload }: PayloadAction<string>) => {
      if (!state.userInfos) {
        state.userInfos = { ...initialUserInfos, nickname: payload };
      }

      state.userInfos.nickname = payload;
    },
    changeUserImage: (state, { payload }: PayloadAction<string>) => {
      if (!state.userInfos) {
        state.userInfos = { ...initialUserInfos, image: payload };
      }

      state.userInfos.image = payload;
    },
    changeUserAddress: (
      state,
      { payload }: PayloadAction<Pick<UserInfos, "latitude" | "longitude">>
    ) => {
      const { latitude, longitude } = payload;
      if (!state.userInfos) {
        state.userInfos = initialUserInfos;
      }

      state.userInfos.latitude = latitude;
      state.userInfos.longitude = longitude;
    },
    /* changeUserInfos: (
      state,
      { payload }: PayloadAction<Partial<UserInfos>>
    ) => {
      const modified = { ...state.userInfos, ...payload };
      state.userInfos = { ...state.userInfos, ...payload };
    }, */
    logOutUser: () => {
      return initialUser;
    },
  },
});

export const selectUser = (state: RootState) => state.user;
export const selectUserInfos = (state: RootState) => state.user.userInfos;

export const {
  logInUser,
  initializeUserInfos,
  changeUserNickname,
  changeUserImage,
  changeUserAddress,
  logOutUser,
} = userSlice.actions;
export const userReducer: Reducer<typeof initialUser> = userSlice.reducer;
