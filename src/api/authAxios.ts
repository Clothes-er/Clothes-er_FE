import { getToken } from "@/hooks/getToken";
import axios from "axios";

// const AuthAxios = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_BASE_URL,
//     headers: {
//       Authorization: `Bearer ${getToken()}`,
//       "Content-Type": "application/json;charset=UTF-8",
//     },
//   });
//   export default AuthAxios;
  
const AuthAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL, // API의 기본 URL 설정
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

export default AuthAxios;