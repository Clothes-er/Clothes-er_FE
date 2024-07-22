"use client";
import AuthAxios from "@/api/authAxios";
import Axios from "@/api/axios";
import Input from "@/components/common/Input";
import { getToken } from "@/hooks/getToken";
import { useRequireAuth } from "@/hooks/useAuth";
import { theme } from "@/styles/theme";
import axios from "axios";
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

  const [image, setImage] = useState<File | null>(null);
  /* 닉네임 */
  const [nickname, setNickname] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const isModify = (image || userInfo?.nickname !== nickname) && !errorMsg;

  useEffect(() => {
    AuthAxios.get("/api/v1/users/info")
      .then((response) => {
        const data = response.data.result;
        setUserInfo(data);
        setNickname(data.nickname);
        console.log(data);
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  /* 닉네임 중복확인 */
  useEffect(() => {
    if (userInfo?.nickname !== nickname && nickname !== "") {
      Axios.get(`/api/v1/users/check-nickname/${nickname}`)
        .then((response) => {
          console.log("닉네임 중복확인 성공", response.data);
          setSuccessMsg("사용가능한 닉네임입니다.");
        })
        .catch((error) => {
          if (error.response && error.response.status === 409) {
            setSuccessMsg("");
            setErrorMsg(error.response.data.message);
          } else {
            console.log("닉네임 중복확인 실패", error);
          }
        });
    } else if (userInfo?.nickname === nickname) {
      setSuccessMsg("");
      setErrorMsg("");
    }
  }, [nickname, userInfo]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };

  const handleModifyProfile = () => {
    const formData = new FormData();

    formData.append(
      "nickname",
      new Blob(
        [
          JSON.stringify({
            nickname: nickname,
          }),
        ],
        { type: "application/json" }
      )
    );

    if (image) {
      formData.append("image", image);
    }

    axios
      .patch("/api/v1/users/profile", formData, {
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        console.log(response.data.result);
        router.push(`/mycloset`);
      })
      .catch((error) => {
        setErrorMsg(error.response.data.message);
        console.log(error.response.data.message);
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
          <SubmitButton onClick={handleModifyProfile} disabled={!isModify}>
            완료
          </SubmitButton>
        </Top>
        <Content>
          <Profile>
            <Image
              src={
                image
                  ? URL.createObjectURL(image)
                  : userInfo?.profileUrl || "/assets/images/basic_profile.svg"
              }
              width={147}
              height={147}
              alt="profile"
              style={{ borderRadius: "100px", background: "white" }}
            />
            <ModifyPhoto>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
              <Image
                src={"/assets/icons/ic_camera_edit.svg"}
                width={30}
                height={30}
                alt="edit"
                onClick={() => document.getElementById("fileInput")?.click()}
              />
            </ModifyPhoto>
          </Profile>
          <Info>
            <Input
              inputType="text"
              label="닉네임"
              value={nickname}
              size="small"
              placeholder="닉네임"
              successMsg={successMsg}
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
  color: ${theme.colors.purple800};
  ${(props) => props.theme.fonts.h2_bold};
  border: none;
  background: none;

  &:disabled {
    color: ${theme.colors.gray800};
  }
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

const ModifyPhoto = styled.label`
  width: 30px;
  height: 30px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 8px;
  right: 8px;
  filter: drop-shadow(0px 4px 20px rgba(85, 85, 85, 0.25));
  cursor: pointer;
`;

const Info = styled.div`
  width: 100%;
  padding: 0 80px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
`;
