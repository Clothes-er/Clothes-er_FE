import axios from "axios";

const AuthAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

AuthAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
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
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/reissue-token`,
            { refreshToken }
          );

          if (response.data.isSuccess && response.data.result) {
            localStorage.setItem("accessToken", response.data.result.accessToken);
            localStorage.setItem("refreshToken", response.data.result.refreshToken);

            originalRequest.headers.Authorization = `Bearer ${response.data.result.accessToken}`;
            
            console.log("토큰 재발급 완료", response.data);
            return AuthAxios(originalRequest);
          }
        } catch (tokenRefreshError:any) {
          if (tokenRefreshError.response?.status === 401) {
            console.error("토큰이 만료되었습니다. 재로그인을 해주세요.");
          }
        }
      }
    }

    return Promise.reject(error);
  }
);


export default AuthAxios;