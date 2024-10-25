import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken, getIsFirstLogin } from "@/util/storage";

export const useRequireAuth = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const accessToken = getAccessToken();
      const isFirstLogin = getIsFirstLogin();

      // 토큰이 없으면 로그인 페이지로 리다이렉트
      if (!accessToken) {
        router.push("/");
      } else if (accessToken && isFirstLogin === "true") {
        router.push("/first/step1");
      }
    }
  }, [router]);
};
