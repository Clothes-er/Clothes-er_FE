"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { theme } from "@/styles/theme";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";

const Step2 = () => {
  const router = useRouter();
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [foot, setFoot] = useState("");
  const [body, setBody] = useState("");

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
        서비스 이용을 위한
        <br />
        스펙을 입력해주세요.
        <Small>모든 항목은 추후 수정될 수 있습니다.</Small>
      </Story>
      <Card>
        <div>
          <Label>기본 정보</Label>
          <Row>
            <Input
              value={height}
              placeholder="남자"
              onChange={(value: string) => setHeight(value)}
            />
            <Input
              value={weight}
              placeholder="여자"
              onChange={(value: string) => setWeight(value)}
            />
          </Row>
        </div>
        <Row>
          <Input
            value={height}
            placeholder="키"
            onChange={(value: string) => setHeight(value)}
          />
          <Input
            value={weight}
            placeholder="몸무게"
            onChange={(value: string) => setWeight(value)}
          />
        </Row>
        <Input
          value={foot}
          placeholder="발사이즈"
          onChange={(value: string) => setFoot(value)}
        />
        <Input
          label="체형"
          value={body}
          placeholder="어깨가 넓어요, 허리가 길어요"
          onChange={(value: string) => setBody(value)}
        />
      </Card>
      <Row>
        <Button
          text="이전 단계"
          size="medium"
          onClick={() => router.push("/first/step1")}
        />
        <Button
          text="다음 단계"
          buttonType="primaryDeep"
          size="medium"
          onClick={() => router.push("/first/step3")}
        />
      </Row>
    </Layout>
  );
};

export default Step2;

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
  gap: 25px;
  border-radius: 15px;
  background: ${theme.colors.white};
  box-shadow: 0px 4px 30px 0px rgba(171, 171, 171, 0.25);
  z-index: 10;
`;

const Label = styled.div`
  text-align: left;
  color: ${theme.colors.black};
  ${(props) => props.theme.fonts.b2_bold};
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
`;
