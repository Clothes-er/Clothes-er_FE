import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken, getIsFirstLogin } from "@/util/storage";

export const useRequireFirstAuth = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const accessToken = getAccessToken();
      const isFirstLogin = getIsFirstLogin();

      // 최초 로그인이 아니면 로그인 또는 홈 페이지로 리다이렉트
      if (!isFirstLogin) {
        if (accessToken) {
          router.push("/home");
        } else {
          router.push("/");
        }
      }
    }
  }, [router]);
};
