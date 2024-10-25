import { clearTokens, getAccessToken, getIsAutoLogin, getRefreshToken, setTokens } from "@/util/storage";
import axios from "axios";

const AuthAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

AuthAxios.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

AuthAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken() ?? "";
      const isAutoLogin = getIsAutoLogin() ?? "";
      console.log("재발급할 때 보내지는 refreshToken", refreshToken);
      if (refreshToken.length>0) {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/reissue-token`,
            { refreshToken }
          );

          if (response.data.isSuccess && response.data.result) {
            setTokens(
              response.data.result.accessToken,
              response.data.result.refreshToken,
              isAutoLogin
            );

            originalRequest.headers.Authorization = `Bearer ${response.data.result.accessToken}`;
            
            console.log("토큰 재발급 완료", response.data);
            return AuthAxios(originalRequest);
          }
        } catch (tokenRefreshError: any) {
            if (tokenRefreshError.response?.status === 400) {
              console.error(
                "400 에러: 유효하지 않은 리프레시 토큰입니다.",
                tokenRefreshError.response.data
              );
              clearTokens();
              window.location.replace('/');
            }
            if (tokenRefreshError.response?.status === 401) {
              console.error("토큰이 만료되었습니다. 재로그인을 해주세요.");
              clearTokens();
              window.location.replace('/');
          }
        }
      }
    }

    return Promise.reject(error);
  }
);


export default AuthAxios;