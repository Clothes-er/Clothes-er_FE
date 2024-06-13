"use client";

import Axios from "@/api/axios";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Tabbar from "@/components/common/Tabbar";
import { setUser } from "@/redux/slices/userSlice";
import { useAppDispatch } from "@/redux/store";
import { theme } from "@/styles/theme";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";

interface SaveProps {
  save: boolean;
}

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [save, setSave] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSave = () => {
    setSave(!save);
  };

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
        };
        dispatch(setUser(userData));
        localStorage.setItem("accessToken", userData.token);
        localStorage.setItem("isFirstLogin", userData.isFirstLogin);
        console.log("userData", userData.isFirstLogin);
        if (userData.isFirstLogin) {
          router.push("/first/step1");
        } else {
          router.push("/home");
        }
      })
      .catch((error) => {
        console.log("로그인 실패", error);
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError("이메일과 비밀번호를 확인해주세요.");
        }
      });
  };

  return (
    <>
      <Layout>
        <Background>
          <Image
            src="/assets/images/shape.svg"
            width={575}
            height={592}
            alt="logo"
          />
        </Background>
        <Character>
          <Image
            src="/assets/images/character.svg"
            width={48}
            height={55}
            alt="logo"
          />
        </Character>
        <Logo>
          <Image
            src="/assets/images/logo.svg"
            width={111}
            height={36}
            alt="logo"
          />
        </Logo>
        <Story>
          옷은 많은데...
          <br />
          입을 게 없네?
          <Small>
            Clothes:er와 함께
            <br /> 동네 주민들과 옷장을 공유해봐요!
          </Small>
        </Story>
        <Login>
          <Purple>LOGIN</Purple>
          <Input
            value={email}
            onChange={(value: string) => setEmail(value)}
            placeholder="이메일"
          />
          <Input
            inputType="password"
            value={password}
            onChange={(value: string) => setPassword(value)}
            placeholder="비밀번호"
          />
          <Error error={error}>{error}</Error>
          <Save save={save} onClick={handleSave}>
            {save ? (
              <Image
                src="/assets/icons/ic_save.svg"
                width={23}
                height={23}
                alt="check"
              />
            ) : (
              <Image
                src="/assets/icons/ic_notsave.svg"
                width={23}
                height={23}
                alt="check"
              />
            )}
            로그인 정보 저장하기
          </Save>
          <Button
            text="로그인"
            onClick={handleLogin}
            disabled={!(email && password)}
          />
          <Nav>
            <Link href="/join/terms">회원가입</Link>
            {/* <Link href="/findId">아이디 찾기</Link>|
            <Link href="/findPw">비밀번호 찾기</Link> */}
          </Nav>
        </Login>
      </Layout>
      <Tabbar disabled={true} />
    </>
  );
}

const Layout = styled.div`
  max-width: 560px;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0px;
  z-index: 0;
`;

const Character = styled.div`
  position: absolute;
  top: 100px;
  right: 50px;
`;

const Logo = styled.div`
  width: 100%;
  margin-bottom: 45px;
  z-index: 10;
`;

const Story = styled.div`
  width: 100%;
  text-align: left;
  color: ${theme.colors.white};
  ${(props) => props.theme.fonts.h1_bold};
  z-index: 10;
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Small = styled.div`
  ${(props) => props.theme.fonts.b2_regular};
`;

const Login = styled.div`
  width: 100%;
  border-radius: 15px;
  padding: 24px 28px 40px 28px;
  background: ${theme.colors.white};
  box-shadow: 0px 4px 30px 0px rgba(171, 171, 171, 0.25);
  display: flex;
  flex-direction: column;
  text-align: center;
  z-index: 10;
  color: ${theme.colors.gray900};
  ${(props) => props.theme.fonts.b3_regular};
`;

const Purple = styled.div`
  color: ${theme.colors.purple200};
  text-align: center;
  ${(props) => props.theme.fonts.h1_medium}
  margin-bottom: 24px;
`;

const Error = styled.div<{ error: string }>`
  text-align: left;
  height: 16px;
  padding-left: 10px;
  color: ${(props) => props.theme.colors.delete};
  ${(props) => props.theme.fonts.c1_regular};
  opacity: ${(props) => (props.error ? 1 : 0)};
  margin-bottom: 10px;
`;

const Save = styled.div<SaveProps>`
  display: flex;
  flex-direction: row;
  gap: 3px;
  justify-content: flex-start;
  align-items: center;
  color: ${({ save, theme }) =>
    save ? "rgba(90, 66, 238, 0.7)" : theme.colors.gray900};
  cursor: pointer;
  margin-bottom: 20px;
`;

const Nav = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3px;
  justify-content: center;
  margin-top: 20px;
`;
