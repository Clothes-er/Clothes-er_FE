import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken, getIsFirstLogin } from "@/util/storage";
import { useDispatch } from "react-redux";
import { clearSignIn } from "@/redux/slices/signInSlice";

export const useNoRequireAuth = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const accessToken = getAccessToken();
      const isFirstLogin = getIsFirstLogin();

      // 토큰이 있으면 홈 페이지 또는 첫 방문 페이지로 리다이렉트
      if (accessToken) {
        if (isFirstLogin === "true") {
          router.push("/first/step1");
        } else {
          router.push("/home");
        }
      } else {
        dispatch(clearSignIn());
      }
    }
  }, [router, dispatch]);
};
