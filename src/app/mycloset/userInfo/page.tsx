"use client";
import AuthAxios from "@/api/authAxios";
import Button from "@/components/common/Button";
import Tabbar from "@/components/common/Tabbar";
import Topbar from "@/components/common/Topbar";
import { useRequireAuth } from "@/hooks/useAuth";
import { theme } from "@/styles/theme";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface UserInfo {
  profileUrl: string;
  name: string;
  nickname: string;
  email: string;
  phoneNumber: string;
  recentMessageTime: string;
  birthday: string;
}

const UserInfo = () => {
  useRequireAuth();
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo>();

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

  return (
    <>
      <Layout>
        <Top>
          <Image
            src="/assets/icons/ic_arrow.svg"
            width={24}
            height={24}
            alt="back"
            onClick={() => router.back()}
            style={{ cursor: "pointer" }}
          />
          회원 정보
        </Top>
        <Profile>
          {userInfo?.profileUrl ? (
            <Image
              src={userInfo.profileUrl}
              width={100}
              height={100}
              alt="profile"
              style={{ borderRadius: "100px", background: "white" }}
            />
          ) : (
            <Image
              src={"/assets/images/profile.svg"}
              width={100}
              height={100}
              alt="profile"
              style={{ borderRadius: "100px" }}
            />
          )}
        </Profile>
        <Info>
          <Label>이름</Label>
          <Value>{userInfo?.name}</Value>
          <Label>닉네임</Label>
          <Value>{userInfo?.nickname}</Value>
          <Label>이메일</Label>
          <Value>{userInfo?.email}</Value>
          {/* <Label>비밀번호</Label>
          <Value>{userInfo?.password}</Value> */}
          <Label>전화번호</Label>
          <Value>{userInfo?.phoneNumber}</Value>
          <Label>생년월일</Label>
          <Value>{userInfo?.birthday}</Value>
          {/* <Label>회원탈퇴</Label> */}
        </Info>
      </Layout>
      <Tabbar />
    </>
  );
};

export default UserInfo;

const Layout = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  padding: 42px 20px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Top = styled.div`
  width: calc(50% + 30px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 18px;
  margin-bottom: 15px;
  ${(props) => props.theme.fonts.h2_bold};
`;

const Profile = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 80px;
`;

const Info = styled.div`
  width: 100%;
  padding: 40px;
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  gap: 50px;
`;

const Label = styled.div`
  color: ${theme.colors.gray900};
  ${(props) => props.theme.fonts.b2_regular};
`;

const Value = styled.div`
  color: ${theme.colors.b100};
  ${(props) => props.theme.fonts.b2_bold};
`;
