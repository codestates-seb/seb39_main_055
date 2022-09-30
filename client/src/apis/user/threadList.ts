import { Thread } from "../../types/threads";
import { axiosInstance } from "../../utils";

export const getThreadList = async (): Promise<Thread[]> => {
  const { data } = await axiosInstance.get(
    `v1/user/thread/list?
    page=?&size=?`,
    { headers: { tokenNeeded: true } }
  );
  return data.data;
};
