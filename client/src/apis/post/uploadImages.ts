import { AxiosResponse } from "axios";

import { ThreadImages } from "../../types";
import { axiosInstance } from "../../utils";

const uploadImages = async (images: ThreadImages[]) => {
  const formData = new FormData();

  if (!images.length) return [];

  images.forEach(({ file, md5 }) => {
    const ext = file.type.split("/")[1];
    formData.append("files", file, `${md5}.${ext}`);
  });

  const { data } = await axiosInstance.post<AxiosResponse<string[]>>(
    "/v1/user/upload",
    formData,
    {
      headers: {
        tokenNeeded: true,
      },
    }
  );

  return data.data;
};

export default uploadImages;
