import { getToken } from "@/hooks/getToken";
import axios from "axios";

const AuthAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  export default AuthAxios;
  