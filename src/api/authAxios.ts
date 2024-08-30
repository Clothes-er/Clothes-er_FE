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

export default AuthAxios;