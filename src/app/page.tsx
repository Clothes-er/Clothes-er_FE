"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { theme } from "@/styles/theme";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

interface SaveProps {
  save: boolean;
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [save, setSave] = useState(false);

  const handleSave = () => {
    setSave(!save);
  };

  return (
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
          value={password}
          onChange={(value: string) => setPassword(value)}
          placeholder="비밀번호"
        />
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
        <Button text="로그인" />
        <Nav>
          <Link href="/join/terms">회원가입</Link>|
          <Link href="/findId">아이디 찾기</Link>|
          <Link href="/findPw">비밀번호 찾기</Link>
        </Nav>
      </Login>
    </Layout>
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
  gap: 20px;
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

const Save = styled.div<SaveProps>`
  display: flex;
  flex-direction: row;
  gap: 3px;
  justify-content: flex-start;
  align-items: center;
  color: ${({ save, theme }) =>
    save ? "rgba(90, 66, 238, 0.7)" : theme.colors.gray900};
  cursor: pointer;
`;

const Nav = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3px;
  justify-content: center;
`;
