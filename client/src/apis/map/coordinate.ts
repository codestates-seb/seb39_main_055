import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

import { ErrorResponse } from "../../types/error";

const KAKAO_KEY = process.env.REACT_APP_KAKAO_KEY;

export interface CoordinateResponse {
  documents: { x: string; y: string }[];
}

export async function getCoordinate(
  address: string
): Promise<CoordinateResponse> {
  const { data } = await axios.get(
    `https://dapi.kakao.com/v2/local/search/address.json?query=${address}`,
    {
      headers: {
        Authorization: `KakaoAK ${KAKAO_KEY}`,
      },
    }
  );
  return data;
}

export const useCoordinate = (address: string) => {
  const { data: coordinateData, refetch } = useQuery<
    CoordinateResponse,
    AxiosError<ErrorResponse>
  >(["coordinate", address], () => getCoordinate(address), {
    enabled: false,
    onSuccess: (data) => {
      if (!data.documents.length) {
        toast.error("주소를 상세하게 입력해주세요.");
      }
    },
  });

  return { refetch, coordinateData };
};
