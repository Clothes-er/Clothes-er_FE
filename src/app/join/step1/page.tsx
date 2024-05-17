"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Progressbar from "@/components/common/Progressbar";
import { theme } from "@/styles/theme";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styled from "styled-components";

const Step1 = () => {
  const router = useRouter();
  const [inputs, setInputs] = useState({
    name: "",
    nickname: "",
    email: "",
    emailAuth: "",
  });

  return (
    <Container>
      <Progressbar step={1} />
      <Hello>
        Clothes:er에 오신 것을
        <br /> 환영합니다!
      </Hello>
      <Input
        label="이름"
        value={inputs.name}
        placeholder="홍길동"
        onChange={(value: string) =>
          setInputs({ ...inputs, [inputs.name]: value })
        }
      />
      <Input
        label="닉네임"
        value={inputs.nickname}
        placeholder="홍길동"
        onChange={(value: string) =>
          setInputs({ ...inputs, [inputs.nickname]: value })
        }
      />
      <Input
        label="이메일"
        value={inputs.email}
        placeholder="이메일"
        onChange={(value: string) =>
          setInputs({ ...inputs, [inputs.email]: value })
        }
      />
      <Input
        label="이메일 인증"
        value={inputs.emailAuth}
        placeholder="인증번호"
        onChange={(value: string) =>
          setInputs({ ...inputs, [inputs.emailAuth]: value })
        }
      />
      <Row>
        <Button
          text="이전 단계"
          size="medium"
          onClick={() => router.push("/join/terms")}
        />
        <Button
          text="다음 단계"
          size="medium"
          onClick={() => router.push("/join/step2")}
        />
      </Row>
    </Container>
  );
};

export default Step1;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 26px;
`;

const Hello = styled.div`
  text-align: left;
  color: ${theme.colors.b500};
  ${(props) => props.theme.fonts.h2_bold};
`;

const Row = styled.div`
  display: flex;
  padding: 46px;
  justify-content: space-between;
  gap: 24px;
`;
