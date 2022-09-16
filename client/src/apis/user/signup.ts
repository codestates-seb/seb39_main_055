import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";

import { axiosInstance } from "../../utils";

interface CoordinateResponse {
  documents: { x: string; y: string }[];
}
interface SignupResponse {
  nickname: string;
  email: string;
  image: string;
  userStatus: string;
  longitude: string;
  latitude: string;
}

interface SignupForm {
  nickname: string;
  email: string;
  password: string;
  longitude: string;
  latitude: string;
}

interface ErrorResponse {
  error: string;
  path: string;
  status: number;
  timestamp: string;
}

export async function getCoordinate(
  address: string
): Promise<CoordinateResponse> {
  const { data } = await axios.get(
    `https://dapi.kakao.com/v2/local/search/address.json?query=${address}`,
    {
      headers: {
        Authorization: "KakaoAK f32ac6d09221878e89d289343ad18ba8",
      },
    }
  );
  return data;
}

export async function signupUser(form: SignupForm): Promise<SignupResponse> {
  const { data } = await axiosInstance.post(`v1/sign-up`, form);
  return data;
}

export function useSignup(address: string) {
  const [coordinate, setCoordinate] = useState({ x: "", y: "" });

  const { refetch } = useQuery<CoordinateResponse>(
    ["coordinate", address],
    () => getCoordinate(address),
    {
      enabled: false,
      onSuccess: (data) => {
        setCoordinate({ x: data.documents[0].x, y: data.documents[0].y });
      },
    }
  );

  const { mutate, isSuccess } = useMutation<
    SignupResponse,
    AxiosError<ErrorResponse>,
    SignupForm
  >((form) => signupUser(form), {
    onError: (data) => {
      console.log(data);
      const { response } = data;

      if (!response) {
        toast.error(data.message);
        return;
      }

      toast.error(response.data.error);
    },
  });

  return { refetch, coordinate, mutate, isSuccess };
}
