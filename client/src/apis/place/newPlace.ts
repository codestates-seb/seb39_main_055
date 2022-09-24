/* eslint-disable no-plusplus */
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";

import { ErrorResponse } from "../../types";
import { axiosInstance } from "../../utils/axiosInstance";
import { CoordinateResponse, getCoordinate } from "../map/coordinate";

interface NewPlaceBody {
  category: string;
  addressName: string;
  body: string;
  storeName: string;
  phone: string;
  homepage: string;
}

interface NewPlaceForm extends NewPlaceBody {
  longitude: string;
  latitude: string;
  storeImages: { storeImage: string }[] | null;
}

interface NewPlaceResponse extends NewPlaceForm {
  storeId: string;
  createdAt: string;
  updatedAt: string;
  storeStatus: string;
  user: {
    ninkname: string;
    email: string;
    image: string;
    userStatus: string;
    longitude: string;
    latitude: string;
    userRole: string;
  };
}

export const getImgUrl = async (files: FileList): Promise<string[]> => {
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i]);
  }

  const { data } = await axiosInstance.post("/v1/user/upload", formData, {
    headers: {
      tokenNeeded: true,
      "Content-Type": "multipart/form-data",
    },
  });

  return data.data;
};

export const addNewPlace = async (
  form: NewPlaceForm
): Promise<NewPlaceResponse> => {
  const { data } = await axiosInstance.post("v1/owner/store/register", form, {
    headers: { tokenNeeded: true },
  });
  return data.data;
};

export const useNewPlace = (form: NewPlaceBody) => {
  const queryClient = useQueryClient();

  const { data: fileData, mutate: fileMutate } = useMutation<
    string[],
    AxiosError<ErrorResponse>,
    FileList
  >((files) => getImgUrl(files));

  const { mutate: placeMutate, isSuccess } = useMutation<
    NewPlaceResponse,
    AxiosError<ErrorResponse>,
    NewPlaceForm
  >((form) => addNewPlace(form), {
    onSuccess: () => queryClient.invalidateQueries("place"), // list 구현시 key 수정
  });

  const { refetch } = useQuery<CoordinateResponse, AxiosError<ErrorResponse>>(
    ["coordinate", form.addressName],
    () => getCoordinate(form.addressName),
    {
      enabled: false,
      onSuccess: (data) => {
        if (!data.documents.length) {
          toast.error("주소를 상세하게 입력해주세요.");
          return;
        }

        const storeImages = fileData
          ? (fileData as string[]).map((file) => {
              return { storeImage: file };
            })
          : null;

        placeMutate({
          ...form,
          storeImages,
          longitude: data.documents[0].x,
          latitude: data.documents[0].y,
        });
      },
    }
  );

  return { fileMutate, refetch, isSuccess };
};
