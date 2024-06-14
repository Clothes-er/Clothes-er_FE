import { useEffect } from "react";
import { getToken } from "./getToken";
import { useRouter } from "next/navigation";

export const useRequireFirstAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    const isFirstLogin = localStorage.getItem("isFirstLogin");

    // 최초 로그인이 아니면 로그인 페이지로 리다이렉트
    if (!isFirstLogin) {
      if (token) {
        router.push("/");
      } else {
        router.push("/home");
      }
    }
  }, []);
};
