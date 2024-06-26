import axios, { isAxiosError } from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "https://restcountries.com/v3.1/all",
  timeout: 10000,
});

// 개발 환경에서 로그 출력
const logOnDev = (message: string) => {
  if (import.meta.env.NODE_ENV === "development") {
    console.log(message);
  }
};

// 에러 응답 처리
const onErrorResponse = (error: unknown) => {
  if (isAxiosError(error)) {
    const { message } = error;
    const method = error.config?.method?.toUpperCase();
    const url = error.config?.url;
    const status = error.response?.status;
    const statusText = error.response?.statusText;

    logOnDev(
      `[API] ${method} ${url} | Error ${status} ${statusText} | ${message}`
    );

    switch (status) {
      case 400:
        console.error("잘못된 요청입니다.");
        break;
      case 401:
        console.error("인증 실패입니다.");
        break;
      case 403:
        console.error("권한이 없습니다.");
        break;
      case 404:
        console.error("찾을 수 없는 페이지입니다.");
        break;
      case 500:
        console.error("서버 오류입니다.");
        break;
      default:
        console.error(`에러가 발생했습니다. ${message}`);
    }
  } else if (error instanceof Error) {
    if (error.message.includes("timeout")) {
      logOnDev(`[API] | TimeoutError ${error.message}`);
      console.error("요청 시간이 초과되었습니다.");
    } else {
      logOnDev(`[API] | Error ${error.message}`);
      console.error(`에러가 발생했습니다. ${error.message}`);
    }
  } else {
    logOnDev(`[API] | Unknown error ${JSON.stringify(error)}`);
    console.error(`에러가 발생했습니다. ${JSON.stringify(error)}`);
  }

  return Promise.reject(error);
};

// 응답 인터셉터 설정
api.interceptors.response.use(
  (response) => response,
  (error) => onErrorResponse(error)
);

export default api;
