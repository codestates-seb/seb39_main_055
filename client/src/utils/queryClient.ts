import { AxiosError } from "axios";
import { MutationCache, QueryCache, QueryClient } from "react-query";
import { toast } from "react-toastify";

interface ErrorResponse {
  error: string;
  path: string;
  status: number;
  timestamp: string;
}

type ErrorHandler = (error: unknown) => void;

export const errorHandler: ErrorHandler = (error) => {
  if (error instanceof AxiosError<ErrorResponse>) {
    // 서버에서 주는 에러가 아닐 경우
    if (!error.response?.data) {
      toast.error(error.message);
    }

    // 우리 백엔드 분들은 data.error에 메세지를 넘겨줌
    if (error.response?.data.error) {
      toast.error(error.response?.data.error);
      return;
    }

    // 보통 data.message에 메세지를 넘겨줌 (kakao api 사용 예정)
    if (error.response?.data.message) {
      toast.error(error.response?.data.message);
      return;
    }
  }

  // 혹시 모르는 예외 처리
  toast.error("잠시 후 다시 시도해주세요.");
};

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: errorHandler,
  }),
  mutationCache: new MutationCache({
    onError: errorHandler,
  }),
});
