import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";

import { setToken, setUserInfos, useAppDispatch } from "../../redux";
import { axiosInstance } from "../../utils";

export async function getCoordinate(address: string) {
  const response = await axios.get(
    `https://dapi.kakao.com/v2/local/search/address.json?query=${address}`,
    {
      headers: {
        Authorization: "KakaoAK f32ac6d09221878e89d289343ad18ba8",
      },
    }
  );
  return response.data;
}

export function useCoordinate(address: string) {
  const [coordinate, setCoordinate] = useState({ x: "", y: "" });

  const { data } = useQuery(["coordinate", address], () =>
    getCoordinate(address)
  );
}
