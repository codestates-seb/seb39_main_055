import { useMutation } from "react-query";

import { UserInfos, UserInfosRequest } from "../../redux";
import { ThreadImages } from "../../types";
import { axiosInstance, queryClient } from "../../utils";
import { uploadImages } from "../post";

export type UserInfosPayload = Omit<UserInfosRequest, "image"> & {
  image: ThreadImages | string;
};

interface UserInfosResponse {
  data: UserInfos;
}

const updateProfiles = async (payload: UserInfosPayload) => {
  const { nickname, longitude, latitude, image } = payload;
  let imageObj: ThreadImages;

  if (typeof image === "string") {
    imageObj = { file: null, uri: image, id: image };
  } else {
    imageObj = image;
  }

  const [newImage] = await uploadImages([imageObj]);
  const { data } = await axiosInstance.patch(
    "/v1/user/update",
    {
      nickname,
      longitude,
      latitude,
      image: newImage,
    },
    {
      headers: { tokenNeeded: true },
    }
  );

  return data;
};

const useEditProfiles = () => {
  const { mutate, data, isLoading, isSuccess } = useMutation<
    UserInfosResponse,
    unknown,
    UserInfosPayload
  >((payload) => updateProfiles(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries(["authUser"]);
    },
  });

  return { mutate, data, isLoading, isSuccess };
};

export default useEditProfiles;
