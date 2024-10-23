import { useEffect } from "react";
import { getToken } from "./getToken";
import { useRouter } from "next/navigation";

export const useRequireAuth = () => {
  const router = useRouter();

  useEffect(() => {
    // const token = getToken();
    // const isFirstLogin = localStorage.getItem("isFirstLogin");
    // 토큰이 없으면 로그인 페이지로 리다이렉트
    // if (!token) {
    //   router.push("/");
    // } else if (isFirstLogin) {
    //   router.push("/first/step1");
    // }
  }, []);
};
