import { createSlice, PayloadAction, Reducer } from "@reduxjs/toolkit";

import { User, UserInfos } from "../../types";
import { RootState } from "../store";

export const INITIAL_LOCATION = {
  address: "서울특별시 중구 세종대로 110",
  longitude: 126.97852781,
  latitude: 37.56660794,
};

export const initialUserInfos: UserInfos = {
  userId: -1,
  nickname: "",
  userStatus: "",
  userRole: "ROLE_USER",
  email: "",
  image: "",
  latitude: INITIAL_LOCATION.latitude,
  longitude: INITIAL_LOCATION.longitude,
};

export const initialUser: User = {
  loginStatus: false,
  keepLoggedIn: false,
  locationPermission: false,
  userInfos: initialUserInfos,
  accessToken: "",
  refreshToken: "",
};

type LogInPayload = Pick<User, "accessToken" | "refreshToken" | "keepLoggedIn">;

const userSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {
    logInUser: (state, { payload }: PayloadAction<LogInPayload>) => {
      const { accessToken, refreshToken, keepLoggedIn } = payload;

      if (keepLoggedIn) {
        state.keepLoggedIn = true;
      }
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.loginStatus = true;
    },
    initializeUserInfos: (state, { payload }: PayloadAction<UserInfos>) => {
      const { latitude, longitude } = payload;

      if (!latitude || !longitude) {
        const { latitude: currentLat, longitude: currentLon } =
          state.userInfos || initialUserInfos;

        payload.latitude = currentLat;
        payload.longitude = currentLon;
      }
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
    changeLocationPermission: (state, { payload }: PayloadAction<boolean>) => {
      state.locationPermission = payload;
    },
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
  changeLocationPermission,
  logOutUser,
} = userSlice.actions;
export const userReducer: Reducer<typeof initialUser> = userSlice.reducer;
