"use client";

import Axios from "@/api/axios";
import { setUser } from "@/redux/slices/userSlice";
import {
  handleAllowNotification,
  registerServiceWorker,
} from "@/util/notification";
import {
  setIsAutoLogin,
  setIsFirstLogin,
  setIsSuspended,
  setTokens,
} from "@/util/storage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import dynamic from "next/dynamic";

const LoginPage = dynamic(() => import("@/components/login/LoinPage"), {
  ssr: false,
});

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [save, setSave] = useState(false);
  const [error, setError] = useState<string>("");
  const [notificationPermission, setNotificationPermission] = useState<
    "granted" | "denied" | "default" | null
  >(null);

  const handleSave = () => {
    setSave(!save);
  };

  /* 로그인 성공 후 알림 설정 및 디바이스 토큰 발급 */
  useEffect(() => {
    const initNotification = async () => {
      const permission = await handleAllowNotification(); // 알림 권한 요청
      setNotificationPermission(permission || null);
      if (permission === "granted") {
        registerServiceWorker(); // 권한이 허용되면 Service Worker 등록
      }
    };

    if (
      notificationPermission === "default" ||
      notificationPermission === null
    ) {
      initNotification();
    }
  }, [notificationPermission]);

  const handleLogin = () => {
    Axios.post("/api/v1/users/login", {
      email: email,
      password: password,
    })
      .then((response) => {
        console.log("로그인 성공", response.data);
        const userData = {
          name: "",
          nickname: "",
          email: response.data.result.email,
          password: "",
          phone: "",
          birth: "",
          token: response.data.result.token.accessToken,
          isFirstLogin: response.data.result.isFirstLogin,
          isSuspended: response.data.result.isSuspended,
        };
        dispatch(setUser(userData));
        setTokens(
          response.data.result.token.accessToken,
          response.data.result.token.refreshToken,
          String(save)
        );
        setIsAutoLogin(String(save));
        setIsFirstLogin(userData.isFirstLogin);
        setIsSuspended(userData.isSuspended);

        setNotificationPermission("default");

        if (userData.isFirstLogin) {
          router.push("/first/step1");
        } else {
          router.push("/home");
        }
      })
      .catch((error) => {
        console.log("로그인 실패", error);
        if (error.response) {
          if (
            error.response.data.code === 2130 ||
            error.response.data.code === 3101
          ) {
            console.log(error.response.data.code);
            setError("이메일 또는 비밀번호가 잘못되었습니다.");
          } else {
            setError(error.response.data.message);
          }
        } else {
          setError("이메일과 비밀번호를 확인해주세요.");
        }
      });
  };

  return (
    <LoginPage
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSave={handleSave}
      save={save}
      error={error}
      handleLogin={handleLogin}
      notificationPermission={notificationPermission}
    />
  );
}
