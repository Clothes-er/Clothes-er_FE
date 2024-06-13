import axios from "axios";

const BasicAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  });
  export default BasicAxios;
  