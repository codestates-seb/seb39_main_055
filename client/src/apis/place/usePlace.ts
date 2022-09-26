/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";

import { ErrorResponse } from "../../types";
import { ThreadImages } from "../../types/threads";
import { axiosInstance } from "../../utils/axiosInstance";
import { CoordinateResponse, getCoordinate } from "../map/coordinate";
import { uploadImages } from "../post";

interface NewPlaceBody {
  category: string;
  addressName: string;
  body: string;
  storeName: string;
  phone: string;
  homepage: string;
  storeImages: ThreadImages[];
}

interface NewPlaceForm {
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

interface EditPlacePayload extends NewPlaceForm {
  storeId: string;
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

export const editPlace = async (
  form: EditPlacePayload
): Promise<NewPlaceResponse> => {
  const { data } = await axiosInstance.patch(
    `v1/owner/store/update/${form.storeId}`,
    form,
    {
      headers: { tokenNeeded: true },
    }
  );
  return data.data;
};

export const addPlace = async (
  form: NewPlaceForm
): Promise<NewPlaceResponse> => {
  const { data } = await axiosInstance.post("v1/owner/store/register", form, {
    headers: { tokenNeeded: true },
  });
  return data.data;
};

export const usePlace = (
  form: NewPlaceBody,
  isEditPage: boolean,
  storeId: string
) => {
  const queryClient = useQueryClient();

  const { mutate: fileMutate } = useMutation<
    string[],
    AxiosError<ErrorResponse>,
    NewPlaceBody
  >((payload) => uploadImages(payload.storeImages));

  const { mutate: addPlaceMutate, isSuccess } = useMutation<
    NewPlaceResponse,
    AxiosError<ErrorResponse>,
    NewPlaceForm
  >((payload) => addPlace(payload));

  const { mutate: editPlaceMutate } = useMutation<
    NewPlaceResponse,
    AxiosError<ErrorResponse>,
    EditPlacePayload
  >((payload) => editPlace(payload));

  const { refetch } = useQuery<CoordinateResponse, AxiosError<ErrorResponse>>(
    ["coordinate", form.addressName],
    () => getCoordinate(form.addressName),
    {
      enabled: false,
      onSuccess: (coordinateData) => {
        if (!coordinateData.documents.length) {
          toast.error("주소를 상세하게 입력해주세요.");
          return;
        }
        fileMutate(form, {
          onSuccess: (fileData) => {
            const storeImages = fileData.map((file) => {
              return { storeImage: file };
            });

            isEditPage
              ? editPlaceMutate({
                  ...form,
                  storeId,
                  storeImages,
                  longitude: coordinateData.documents[0].x,
                  latitude: coordinateData.documents[0].y,
                })
              : addPlaceMutate({
                  ...form,
                  storeImages,
                  longitude: coordinateData.documents[0].x,
                  latitude: coordinateData.documents[0].y,
                });

            queryClient.invalidateQueries("place"); // list 구현시 key 수정
          },
        });
      },
    }
  );

  return { refetch, isSuccess };
};
