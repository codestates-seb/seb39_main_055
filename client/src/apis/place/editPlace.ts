import { Store } from "../../types";
import { axiosInstance } from "../../utils";
import { AddPlacePayload } from "./addPlace";

export interface EditPlacePayload extends AddPlacePayload {
  storeId: string;
}

export const editPlace = async (form: EditPlacePayload): Promise<Store> => {
  const { data } = await axiosInstance.patch(
    `v1/owner/store/update/${form.storeId}`,
    form,
    {
      headers: { tokenNeeded: true },
    }
  );
  return data.data;
};
