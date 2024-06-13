import { useEffect } from "react";
import { getToken } from "./getToken";
import { useRouter } from "next/navigation";

export const useNoRequireAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();

    // 토큰이 있으면 홈 페이지로 리다이렉트
    if (token) {
      router.push("/home");
    }
  }, []);
};
