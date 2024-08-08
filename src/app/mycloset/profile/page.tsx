"use client";
import AuthAxios from "@/api/authAxios";
import Axios from "@/api/axios";
import Input from "@/components/common/Input";
import { getToken } from "@/hooks/getToken";
import { useRequireAuth } from "@/hooks/useAuth";
import { convertURLtoFile } from "@/lib/convertURLtoFile";
import { theme } from "@/styles/theme";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

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
  const [initialImage, setInitialImage] = useState<File | null>(null);

  /* 닉네임 */
  const [nickname, setNickname] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  /* 변경 값 확인 */
  const isImageModified =
    initialImage !== image ||
    image?.name !== initialImage?.name ||
    image?.size !== initialImage?.size;
  const isNicknameModified = userInfo?.nickname !== nickname;
  const isModify = (isImageModified || isNicknameModified) && !errorMsg;

  const [photoModal, setPhotoModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await AuthAxios.get("/api/v1/users/info");
        const data = response.data.result;

        setUserInfo(data);
        setNickname(data.nickname);

        const file = await convertURLtoFile(data.profileUrl);
        setImage(file);
        setInitialImage(file);

        console.log(data);
        console.log(response.data.message);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    console.log("image", image);
  }, [image]);

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
    setPhotoModal(false);
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
            <ProfileImage>
              <Image
                src={
                  image
                    ? URL.createObjectURL(image)
                    : "/assets/images/basic_profile.svg"
                }
                layout="fill"
                objectFit="cover"
                alt="profile"
                style={{ borderRadius: "100px", background: "white" }}
              />
            </ProfileImage>
            <ModifyPhoto>
              <Image
                src={"/assets/icons/ic_camera_edit.svg"}
                width={30}
                height={30}
                alt="edit"
                onClick={() => setPhotoModal(true)}
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
        {/* 하단 모달 */}
        <AnimatePresence>
          {photoModal && (
            <MotionModalBack
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setPhotoModal(false)}
            >
              <MotionModal
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
              >
                <List $type="choice" htmlFor="file-input">
                  <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileUpload}
                    style={{ display: "none" }}
                  />
                  <Image
                    src={"/assets/icons/ic_gallery.svg"}
                    width={30}
                    height={30}
                    alt="gallery"
                  />
                  라이브러리에서 사진 선택
                </List>
                <List
                  $type="delete"
                  onClick={() => {
                    setImage(null);
                    setPhotoModal(false);
                  }}
                  $disabled={image === null}
                >
                  <Image
                    src={
                      image !== null
                        ? "/assets/icons/ic_delete.svg"
                        : "/assets/icons/ic_delete_gray.svg"
                    }
                    width={30}
                    height={30}
                    alt="gallery"
                  />
                  현재 사진 삭제
                </List>
              </MotionModal>
            </MotionModalBack>
          )}
        </AnimatePresence>
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

const ProfileImage = styled.div`
  position: relative;
  width: 147px;
  height: 147px;
  background: white;
  border-radius: 50%;
  overflow: hidden;
`;

const ModifyPhoto = styled.div`
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

/* 하단 모달 */
const MotionModalBack = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(9, 9, 9, 0.8);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  overflow-y: hidden;
`;

const MotionModal = styled(motion.div)`
  width: 100%;
  height: 150px;
  padding: 40px 34px 30px 34px;
  border-radius: 15px 15px 0px 0px;
  background: ${theme.colors.white};
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
`;

const List = styled.label<{ $type: string; $disabled?: boolean }>`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  ${(props) => props.theme.fonts.b2_medium};

  &:hover {
    color: ${({ $type, theme }) =>
      $type === "choice" ? theme.colors.purple800 : theme.colors.red};
  }

  ${({ $type, $disabled }) =>
    $type === "delete" &&
    css`
      color: ${$disabled ? theme.colors.gray800 : theme.colors.red};
      pointer-events: ${$disabled ? "none" : "auto"};

      img {
        fill: ${theme.colors.gray700};
      }
    `}
`;
