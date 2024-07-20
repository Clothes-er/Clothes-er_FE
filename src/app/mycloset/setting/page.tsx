"use client";

import Tabbar from "@/components/common/Tabbar";
import Topbar from "@/components/common/Topbar";
import { theme } from "@/styles/theme";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const Setting = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("isFirstLogin");
    router.push("/");
  };

  const handleWithdrawal = () => {
    // 탈퇴하기 API
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
