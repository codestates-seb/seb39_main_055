import { Store } from "./store";
import { UserInfos } from "./user";

export interface Heart {
  heartId: number;
  createdAt: string;
  updatedAt: string;
  heartStatus: string;
  user: UserInfos[];
  store: Store;
}
