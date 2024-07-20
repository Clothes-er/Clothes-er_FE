"use client";
import AuthAxios from "@/api/authAxios";
import Input from "@/components/common/Input";
import Tabbar from "@/components/common/Tabbar";
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

  /* 닉네임 */
  const [nickname, setNickname] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

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
        <Image
          src="/assets/images/logo_black.svg"
          width={101}
          height={18}
          alt="logo"
          onClick={() => router.push("/home")}
          style={{ cursor: "pointer" }}
        />
        <Top>
          <Image
            src="/assets/icons/ic_arrow.svg"
            width={24}
            height={24}
            alt="back"
            onClick={() => router.back()}
            style={{ cursor: "pointer" }}
          />
          프로필 수정
          <SubmitButton>완료</SubmitButton>
        </Top>
        <Content>
          <Profile>
            {userInfo?.profileUrl && (
              <Image
                src={userInfo.profileUrl || "/assets/images/profile.svg"}
                width={147}
                height={147}
                alt="profile"
                style={{ borderRadius: "100px", background: "white" }}
              />
            )}
            <EditImage
              src={"/assets/icons/ic_circle_edit.svg"}
              width={50}
              height={50}
              alt="edit"
            />
          </Profile>
          <Info>
            <Input
              inputType="text"
              label="닉네임"
              value={nickname}
              size="small"
              placeholder="진도리"
              errorMsg={errorMsg}
              onChange={(value: string) => {
                setNickname(value);
              }}
            />
          </Info>
        </Content>
      </Layout>
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
  background: ${theme.colors.ivory};
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 22px;
  margin-bottom: 15px;
  ${(props) => props.theme.fonts.h2_bold};
`;

const SubmitButton = styled.button`
  color: ${theme.colors.gray800};
  ${(props) => props.theme.fonts.h2_bold};
  border: none;
  background: none;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Profile = styled.div`
  width: 147px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 31px;
  position: relative;
`;

const EditImage = styled(Image)`
  position: absolute;
  bottom: -5px;
  right: -5px;
  filter: drop-shadow(0px 4px 15px rgba(85, 85, 85, 0.25));
`;

const Info = styled.div`
  width: 100%;
  padding: 0 80px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
`;
