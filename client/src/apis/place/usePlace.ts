/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
import { AxiosError } from "axios";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";

import { ErrorResponse, Store } from "../../types";
import { ThreadImages } from "../../types/threads";
import { CoordinateResponse, getCoordinate } from "../map/coordinate";
import { uploadImages } from "../post";
import { addPlace, AddPlacePayload } from "./addPlace";
import { editPlace, EditPlacePayload } from "./editPlace";

export interface UsePlaceForm {
  category: string;
  addressName: string;
  body: string;
  storeName: string;
  phone: string;
  homepage: string;
  storeImages: ThreadImages[];
}

const usePlace = (form: UsePlaceForm, isEditPage: boolean, storeId: string) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: fileMutate } = useMutation<
    string[],
    AxiosError<ErrorResponse>,
    UsePlaceForm
  >((payload) => uploadImages(payload.storeImages));

  const {
    data: placeData,
    mutate: addPlaceMutate,
    isSuccess: isAddSuccess,
  } = useMutation<Store, AxiosError<ErrorResponse>, AddPlacePayload>(
    (payload) => addPlace(payload)
  );

  const { mutate: editPlaceMutate, isSuccess: isEditSuccess } = useMutation<
    Store,
    AxiosError<ErrorResponse>,
    EditPlacePayload
  >((payload) => editPlace(payload));

  const { refetch } = useQuery<CoordinateResponse, AxiosError<ErrorResponse>>(
    ["coordinate", form.addressName],
    () => getCoordinate(form.addressName),
    {
      enabled: false,
      onSettled: () => setIsLoading(true),
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

            // queryClient.invalidateQueries("place"); // list 구현시 key 수정
            setIsLoading(false);
          },
        });
      },
    }
  );

  return { refetch, isAddSuccess, isEditSuccess, isLoading, placeData };
};

export default usePlace;
