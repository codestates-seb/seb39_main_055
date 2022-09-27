export interface User {
  nickname: string;
  email: string;
  image: string;
  userStatus: string;
  longitude: number;
  latitude: number;
  userRole: "ROLE_OWNER" | "ROLE_USER";
}
