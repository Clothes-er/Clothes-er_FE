"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Progressbar from "@/components/common/Progressbar";
import { theme } from "@/styles/theme";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styled from "styled-components";

const Step3 = () => {
  const router = useRouter();
  const [inputs, setInputs] = useState({
    name: "",
    nickname: "",
    email: "",
    emailAuth: "",
  });

  return (
    <Container>
      <Progressbar step={3} />
      <Hello>
        Clothes:er에 오신 것을
        <br /> 환영합니다!
      </Hello>
      <Row>
        <Input
          label="전화번호"
          value={inputs.name}
          placeholder="전화번호"
          onChange={(value: string) =>
            setInputs({ ...inputs, [inputs.name]: value })
          }
        />
        <Button
          buttonType="primaryLight"
          text="인증"
          size="small"
          onClick={() => {}}
        />
      </Row>
      <Row>
        <Input
          label="전화번호 인증"
          value={inputs.nickname}
          placeholder="인증번호"
          onChange={(value: string) =>
            setInputs({ ...inputs, [inputs.nickname]: value })
          }
        />
        <Button
          buttonType="primaryLight"
          text="인증"
          size="small"
          onClick={() => {}}
        />
      </Row>

      <Button
        text="회원가입"
        size="medium"
        onClick={() => router.push("/join/finish")}
      />
    </Container>
  );
};

export default Step3;

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
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
`;
