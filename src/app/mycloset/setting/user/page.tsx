"use client";

import AuthAxios from "@/api/authAxios";
import Tabbar from "@/components/common/Tabbar";
import Topbar from "@/components/common/Topbar";
import { theme } from "@/styles/theme";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface UserInfo {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  birthday: string;
}

const UserPage = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo>();

  const text = "비밀번호텍스트";
  const length = text.length;
  const dots = Array(length).fill("●");

  useEffect(() => {
    AuthAxios.get("/api/v1/users/info")
      .then((response) => {
        const data = response.data.result;
        setUserInfo(data);
        console.log(data);
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
        <Topbar
          text="계정 정보"
          align="center"
          icon={true}
          link="/mycloset/setting"
        />
        <Content>
          <Label>
            <Div>이름</Div>
            <Div>이메일</Div>
            <Div>비밀번호</Div>
            <Div>전화번호</Div>
            <Div>생년월일</Div>
          </Label>
          <Label>
            <Text>{userInfo?.name}</Text>
            <Text>{userInfo?.email}</Text>
            <Text>
              {dots.map((dot, index) => (
                <Dot key={index}>{dot}</Dot>
              ))}
            </Text>
            <Text>{userInfo?.phoneNumber}</Text>
            <Text>{userInfo?.birthday}</Text>
          </Label>
        </Content>
      </Layout>
    </>
  );
};

export default UserPage;

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
  display: grid;
  grid-template-columns: 2fr 3fr;
  text-align: left;
  padding: 55px 18px;
`;

const Label = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 39px;
`;

const Div = styled.div`
  width: 100%;
  color: ${theme.colors.b100};
  ${(props) => props.theme.fonts.b2_medium};
`;

const Text = styled(Div)`
  display: flex;
  align-items: center;
  gap: 2px;
  color: ${theme.colors.b100};
  ${(props) => props.theme.fonts.b2_regular};
`;

const Dot = styled.div`
  font-size: 14px;
`;
