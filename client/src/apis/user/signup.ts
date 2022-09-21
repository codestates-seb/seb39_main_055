import { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";

import { ErrorResponse } from "../../types";
import { axiosInstance } from "../../utils";
import { CoordinateResponse, getCoordinate } from "../map";

interface SignupResponse {
  nickname: string;
  email: string;
  image: string;
  userStatus: string;
  longitude: string;
  latitude: string;
  userRole: string;
}

interface SignupBody {
  nickname: string;
  email: string;
  password: string;
  userRole: string;
}

interface SignupForm extends SignupBody {
  longitude: string;
  latitude: string;
}

export async function signupUser(form: SignupForm): Promise<SignupResponse> {
  const { data } = await axiosInstance.post(`v1/sign-up`, form);
  return data;
}

export function useSignup(address: string, form: SignupBody) {
  const { mutate, isSuccess } = useMutation<
    SignupResponse,
    AxiosError<ErrorResponse>,
    SignupForm
  >((form) => signupUser(form), {
    onError: (data) => {
      const { response } = data;

      if (response?.status === 500) {
        toast.error("중복된 이메일입니다.");
      }
    },
  });

  const { refetch } = useQuery<CoordinateResponse, AxiosError<ErrorResponse>>(
    ["coordinate", address],
    () => getCoordinate(address),
    {
      enabled: false,
      onSuccess: (data) => {
        if (!data.documents.length) {
          toast.error("주소를 상세하게 입력해주세요.");
          return;
        }
        mutate({
          ...form,
          longitude: data.documents[0].x,
          latitude: data.documents[0].y,
        });
      },
    }
  );

  return { refetch, isSuccess };
}
