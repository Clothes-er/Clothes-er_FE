"use client";

import Axios from "@/api/axios";
import { setUser } from "@/redux/slices/userSlice";
import {
  setIsAutoLogin,
  setIsFirstLogin,
  setIsSuspended,
  setTokens,
} from "@/util/storage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import LoginPage from "@/components/login/LoinPage";
import dynamic from "next/dynamic";

const DeviceTokenComponent = dynamic(
  () => import("@/components/login/DeviceTokenComponent"),
  { ssr: false }
);

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [save, setSave] = useState(false);
  const [error, setError] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTokenRequested, setIsTokenRequested] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const handleSave = () => {
    setSave(!save);
  };

  useEffect(() => {}, [isLoggedIn]);

  const handleLogin = async () => {
    try {
      const response = await Axios.post("/api/v1/users/login", {
        email: email,
        password: password,
      });

      setIsLoggedIn(true);
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
      setUserData(userData);

      dispatch(setUser(userData));
      setTokens(
        response.data.result.token.accessToken,
        response.data.result.token.refreshToken,
        String(save)
      );
      setIsAutoLogin(String(save));
      setIsFirstLogin(userData.isFirstLogin);
      setIsSuspended(userData.isSuspended);
    } catch (error: any) {
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
    }
  };

  useEffect(() => {
    // 로그인 후, 디바이스 토큰 요청 완료 시 경로 이동
    if (isLoggedIn && isTokenRequested) {
      if (userData.isFirstLogin) {
        router.push("/first/step1");
      } else {
        router.push("/home");
      }
    }
  }, [isLoggedIn, isTokenRequested]);

  return (
    <>
      <LoginPage
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSave={handleSave}
        save={save}
        error={error}
        handleLogin={handleLogin}
      />
      {isLoggedIn && (
        <DeviceTokenComponent
          onTokenRequestComplete={() => setIsTokenRequested(true)}
        />
      )}
    </>
  );
}
