export interface User {
  nickname: string;
  email: string;
  image: string;
  userStatus: string;
  longitude: string;
  latitude: string;
  userRole: "ROLE_OWNER" | "ROLE_USER";
}
