"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { theme } from "@/styles/theme";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";

const Step1 = () => {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [style, setStyle] = useState("");

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
      <Story>
        동네 설정을 위한
        <br />
        주소를 입력해주세요.
        <Small>모든 항목은 수정할 수 있습니다.</Small>
      </Story>
      <Card>
        <Input
          label="카테고리"
          value={category}
          placeholder="가디건, 셔츠, 청바지 등"
          onChange={(value: string) => setCategory(value)}
        />
        <Input
          label="스타일"
          value={style}
          placeholder="스타일"
          onChange={(value: string) => setStyle(value)}
        />
      </Card>
      <Row>
        <Button
          text="이전 단계"
          size="medium"
          onClick={() => router.push("/first/step2")}
        />
        <Button
          text="제출하기"
          buttonType="primaryDeep"
          size="medium"
          onClick={() => router.push("/home")}
        />
      </Row>
    </Layout>
  );
};

export default Step1;

const Layout = styled.div`
  max-width: 560px;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  padding: 86px 40px 38px 40px;
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

const Card = styled.div`
  width: 100%;
  height: 404px;
  padding: 29px 20px;
  margin-bottom: 55px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 33px;
  border-radius: 15px;
  background: ${theme.colors.white};
  box-shadow: 0px 4px 30px 0px rgba(171, 171, 171, 0.25);
  z-index: 10;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
`;
