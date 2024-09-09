"use client";

import AuthAxios from "@/api/authAxios";
import Topbar from "@/components/common/Topbar";
import { showToast } from "@/hooks/showToast";
import { clearUser } from "@/redux/slices/userSlice";
import { theme } from "@/styles/theme";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const Setting = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("refreshToken");
      setRefreshToken(token);
    }
  }, []);

  const handleLogout = () => {
    if (refreshToken) {
      AuthAxios.post("/api/v1/users/logout", {
        refreshToken,
      })
        .then((response) => {
          console.log("로그아웃 성공", response);
          showToast({
            text: `성공적으로 로그아웃 되었습니다.`,
            icon: "💜",
            type: "success",
          });
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("isFirstLogin");
          dispatch(clearUser());
          router.push("/");
        })
        .catch((error) => {
          console.log("로그아웃 실패", error);
        });
    }
  };

  const handleWithdrawal = () => {
    AuthAxios.delete("/api/v1/users/withdraw")
      .then((response) => {
        console.log("회원탈퇴 성공", response);
        showToast({
          text: `성공적으로 회원탈퇴 되었습니다.`,
          icon: "👋🏻",
          type: "success",
        });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("isFirstLogin");
        dispatch(clearUser());
        router.push("/");
      })
      .catch((error) => {
        console.log("회원탈퇴 실패", error);
        if (error.response) {
          // 거래 중 혹은 유예된 경우
          if (
            error.response.data.code === 2160 ||
            error.response.data.code === 2131
          ) {
            console.log(error.response.data.code);
            showToast({
              text: `${error.response.data.message}`,
              icon: "❌",
              type: "error",
            });
          } else {
            console.log(error.response.data.message);
          }
        }
      });
  };

  return (
    <>
      <Layout>
        <Image
          src="/assets/images/logo_black.svg"
          width={101}
          height={18}
          alt="logo"
          onClick={() => router.push("/home")}
          style={{ cursor: "pointer" }}
        />
        <Topbar text="설정" align="center" icon={true} link="/mycloset" />
        <Content>
          <Div onClick={() => router.push("/mycloset/setting/user")}>
            계정 정보
          </Div>
          <Div>공지사항</Div>
          <Div>자주 묻는 질문</Div>
          <Div>약관 및 정책</Div>
          <Div onClick={handleLogout}>로그아웃</Div>
          <Div onClick={handleWithdrawal}>탈퇴하기</Div>
        </Content>
      </Layout>
    </>
  );
};

export default Setting;

const Layout = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  padding: 42px 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  background: ${theme.colors.ivory};
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  padding: 55px 18px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 37px;
`;

const Div = styled.div`
  width: 100%;
  color: ${theme.colors.b500};
  ${(props) => props.theme.fonts.b2_medium};
  cursor: pointer;
`;
