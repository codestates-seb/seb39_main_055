import { Store } from "../../types";
import { axiosInstance } from "../../utils";

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
