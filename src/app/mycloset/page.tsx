"use client";
import AuthAxios from "@/api/authAxios";
import Tabbar from "@/components/common/Tabbar";
import Topbar from "@/components/common/Topbar";
import { getLevelText } from "@/data/levelData";
import { useRequireAuth } from "@/hooks/useAuth";
import { theme } from "@/styles/theme";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface ProfileInfo {
  nickname: string;
  profileUrl: string;
  level: number;
  rentalCount: number;
  height: number;
  weight: number;
  shoeSize: number;
  bodyShapes: string[];
  categories: string[];
  styles: string[];
  followers: number;
  followees: number;
}
const MyCloset = () => {
  useRequireAuth();
  const router = useRouter();
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>();

  useEffect(() => {
    AuthAxios.get("/api/v1/users/profile")
      .then((response) => {
        const data = response.data.result;
        setProfileInfo(data);
        console.log(data);
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.push("/");
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
        <Topbar text="내 옷장" align="left" />
        <Profile>
          {profileInfo?.profileUrl ? (
            <Image
              src={profileInfo.profileUrl}
              width={70}
              height={70}
              alt="profile"
              style={{ borderRadius: "100px", background: "white" }}
            />
          ) : (
            <Image
              src={"/assets/images/profile.svg"}
              width={70}
              height={70}
              alt="profile"
              style={{ borderRadius: "100px" }}
            />
          )}
          <Text>
            <Nickname>{profileInfo?.nickname}</Nickname>
            <Level>
              Lv {profileInfo?.level}.{" "}
              {profileInfo?.level && getLevelText(profileInfo.level)}
              <Span>{profileInfo?.rentalCount}개의 옷을 아꼈어요!</Span>
            </Level>
          </Text>
          <Buttons>
            <InfoButton onClick={() => router.push("/mycloset/userInfo")}>
              회원 정보
            </InfoButton>
          </Buttons>
        </Profile>
        <User>
          <Inner>
            <Box>
              <div>
                <Title>스펙</Title>
                <Content>
                  <div>키</div>
                  <div>
                    {profileInfo?.height ? `${profileInfo.height}cm` : "미공개"}
                  </div>
                  <div>몸무게</div>
                  <div>
                    {profileInfo?.weight ? `${profileInfo.weight}kg` : "미공개"}
                  </div>
                  <div>발 크기</div>
                  <div>
                    {profileInfo?.shoeSize
                      ? `${profileInfo.shoeSize}mm`
                      : "미공개"}
                  </div>
                </Content>
              </div>
              <Keywords>
                {profileInfo?.bodyShapes[0] ? (
                  <>
                    {profileInfo?.bodyShapes.map((data, index) => (
                      <Keyword key={index}>{data}</Keyword>
                    ))}
                  </>
                ) : (
                  <Keyword>체형정보 미기입</Keyword>
                )}
              </Keywords>
            </Box>
            <Box>
              <div>
                <Title>취향</Title>
                <Style>
                  {profileInfo?.categories.map((data, index) => (
                    <span key={index}>{data}</span>
                  ))}
                </Style>
              </div>
              <Keywords>
                {profileInfo?.styles[0] ? (
                  <>
                    {profileInfo?.styles.map((data, index) => (
                      <Keyword key={index}>{data}</Keyword>
                    ))}
                  </>
                ) : (
                  <Keyword>스타일 미기입</Keyword>
                )}
              </Keywords>
            </Box>
          </Inner>
        </User>
        <Setting onClick={handleLogout}>
          <div>로그아웃</div>
        </Setting>
      </Layout>
      <Tabbar />
    </>
  );
};

export default MyCloset;

const Layout = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  padding: 42px 20px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Profile = styled.div`
  width: 100%;
  height: 127px;
  padding: 30px;
  border-radius: 20px;
  background: ${theme.colors.purple50};
  box-shadow: 0px 4px 20px 0px rgba(215, 215, 215, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const Text = styled.div`
  width: 120px;
  display: flex;
  flex-direction: column;
  gap: 13px;
  margin-left: 30px;
  margin-right: 30px;
`;

const Nickname = styled.div`
  ${(props) => props.theme.fonts.b2_medium};
`;

const Level = styled.div`
  display: flex;
  flex-direction: column;
  ${(props) => props.theme.fonts.c1_regular};
`;

const Span = styled.div`
  color: ${theme.colors.gray900};
  ${(props) => props.theme.fonts.c3_regular};
`;

const Buttons = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 13px;
`;

const InfoButton = styled.button`
  width: 70px;
  height: 28px;
  background: ${theme.colors.purple200};
  color: ${theme.colors.white};
  ${(props) => props.theme.fonts.c3_bold};
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const User = styled.div`
  width: 100%;
  height: 200px;
  padding: 40px 30px;
  border-radius: 20px;
  background: ${theme.colors.white};
  box-shadow: 0px 4px 20px 0px rgba(215, 215, 215, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const Inner = styled.div`
  height: 100%;
  display: flex;
  align-items: flex-start;
  gap: 30px;
`;

const Box = styled.div`
  width: 130px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
`;

const Title = styled.div`
  ${(props) => props.theme.fonts.b2_bold};
  margin-bottom: 10px;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: left;
  color: ${theme.colors.b100};
  ${(props) => props.theme.fonts.c2_regular};
`;

const Style = styled.div`
  color: ${theme.colors.b100};
  ${(props) => props.theme.fonts.c2_regular};
`;

const Keywords = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 6px;
`;

const Keyword = styled.div`
  height: 23px;
  padding: 6px 10px;
  border-radius: 15px;
  background: linear-gradient(180deg, #f69e9e 0%, #ffbcc8 100%);
  color: ${theme.colors.white};
  ${(props) => props.theme.fonts.c3_bold};
  white-space: nowrap;
`;

const Setting = styled.div`
  width: 100%;
  height: auto;
  padding: 20px 40px;
  border-radius: 20px;
  background: ${theme.colors.gray100};
  box-shadow: 0px 4px 20px 0px rgba(215, 215, 215, 0.25);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  color: ${theme.colors.gray900};
  &:hover {
    color: ${theme.colors.b100};
  }
  cursor: pointer;
`;
