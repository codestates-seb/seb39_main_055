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

interface FileMutatePayload extends NewPlaceBody {
  longitude: string;
  latitude: string;
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

  const { mutate: fileMutate } = useMutation<
    string[],
    AxiosError<ErrorResponse>,
    FileMutatePayload
  >((payload) => uploadImages(payload.storeImages));

  const { mutate: placeMutate, isSuccess } = useMutation<
    NewPlaceResponse,
    AxiosError<ErrorResponse>,
    NewPlaceForm
  >((payload) => addNewPlace(payload));

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
        fileMutate(
          {
            ...form,
            longitude: coordinateData.documents[0].x,
            latitude: coordinateData.documents[0].y,
          },
          {
            onSuccess: (fileData) => {
              const storeImages = fileData.map((file) => {
                return { storeImage: file };
              });
              console.log(`좌표: ${coordinateData.documents}`);
              console.log(`이미지: ${storeImages}`);
              console.log(`폼: ${form}`);
              placeMutate({
                ...form,
                storeImages,
                longitude: coordinateData.documents[0].x,
                latitude: coordinateData.documents[0].y,
              });
              queryClient.invalidateQueries("place"); // list 구현시 key 수정
            },
          }
        );
      },
    }
  );

  return { refetch, isSuccess };
};
