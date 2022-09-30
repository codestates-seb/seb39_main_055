export interface UserInfos {
  userId: number;
  nickname: string;
  email: string;
  image: string;
  userStatus: string;
  longitude: number;
  latitude: number;
  userRole: "ROLE_OWNER" | "ROLE_USER";
  hearts?: unknown[];
  threads?: unknown[];
}

export interface User {
  loginStatus: boolean;
  locationPermission: boolean;
  userInfos: UserInfos | null;
  keepLoggedIn: boolean;
  token: string;
}

export type EditUserInfosRequest = Pick<
  UserInfos,
  "nickname" | "image" | "longitude" | "latitude"
>;
