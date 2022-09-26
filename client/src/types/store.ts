import { User } from "./user";

export interface Store {
  storeId: string;
  createdAt: string;
  updatedAt: string;
  storeStatus: string;
  category: string;
  longitude: string;
  latitude: string;
  storeName: string;
  addressName: string;
  body: string;
  phone: string;
  homepage: string;
  storeImages: { storeImage: string }[];
  user: User;
  // reviews: [];
  // heartUserId: [];
}
