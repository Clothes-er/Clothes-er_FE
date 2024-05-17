"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Progressbar from "@/components/common/Progressbar";
import { theme } from "@/styles/theme";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styled from "styled-components";

const Step3 = () => {
  const router = useRouter();

  return (
    <Container>
      <Progressbar step={3} />
      <Image
        src="/assets/images/congratulate.svg"
        width={152}
        height={193}
        alt="축하"
      />
      <Hello>
        클로저 님의
        <br />
        회원가입을 축하합니다!
      </Hello>
      <P>클로저와 함께 다양한 서비스를 이용해보세요!</P>
      <Button text="로그인으로 이동" onClick={() => router.push("/")} />
    </Container>
  );
};

export default Step3;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 26px;
`;

const Hello = styled.div`
  text-align: center;
  color: ${theme.colors.b500};
  ${(props) => props.theme.fonts.h2_bold};
`;

const P = styled.div`
  color: ${theme.colors.purple500};
  ${(props) => props.theme.fonts.b2_medium};
  margin-bottom: 172px;
`;
