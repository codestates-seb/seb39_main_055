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

export interface EditPlacePayload extends AddPlacePayload {
  storeId: string;
}

export const getPlaceDetail = async (storeId: string): Promise<Store> => {
  const { data } = await axiosInstance.get(
    `v1/store/${storeId}?page=1&size=3&sort=createdAt`
  );
  return data.data;
};

export const getPlaceList = async (category: string): Promise<Store[]> => {
  const { data } = await axiosInstance.get(
    `v1/store?category=${category}&page=1&size=10&sort=score`
  );
  return data.data;
};

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

export const editPlace = async (payload: EditPlacePayload): Promise<Store> => {
  const { data } = await axiosInstance.patch(
    `v1/owner/store/update/${payload.storeId}`,
    { payload },
    {
      headers: { tokenNeeded: true },
    }
  );
  return data.data;
};

export const deletePlace = async (storeId: string): Promise<Store> => {
  const { data } = await axiosInstance.patch(
    `/v1/owner/store/update/${storeId}`,
    { storeStatus: "STORE_NOT_EXIST" },
    {
      headers: { tokenNeeded: true },
    }
  );
  return data.data;
};
