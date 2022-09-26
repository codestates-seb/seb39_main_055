import { Store } from "../../types";
import { axiosInstance } from "../../utils";

export interface AddPlacePayload {
  category: string;
  addressName: string;
  body: string;
  storeName: string;
  phone: string;
  homepage: string;
  longitude: string;
  latitude: string;
  storeImages: { storeImage: string }[];
}

export const addPlace = async (payload: AddPlacePayload): Promise<Store> => {
  const { data } = await axiosInstance.post(
    "v1/owner/store/register",
    payload,
    {
      headers: { tokenNeeded: true },
    }
  );
  return data.data;
};
