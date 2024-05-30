"use client";

import Button from "@/components/common/Button";
import Dropdown from "@/components/common/Dropdown";
import Input from "@/components/common/Input";
import { theme } from "@/styles/theme";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";

const Step1 = () => {
  const router = useRouter();
  const [category, setCategory] = useState("");

  const styleOptions = ["러블리", "빈티지", "시크", "힙합"];
  const [style, setStyle] = useState("");

  const handleChange = (selectedOption: string) => {
    setStyle(selectedOption);
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
      <Story>
        동네 설정을 위한
        <br />
        주소를 입력해주세요.
        <Small>모든 항목은 수정할 수 있습니다.</Small>
      </Story>
      <Card>
        <div>
          <Label>
            카테고리
            <Span>(,로 복수입력)</Span>
          </Label>
          <Input
            value={category}
            placeholder="가디건, 셔츠, 청바지 등"
            onChange={(value: string) => setCategory(value)}
          />
        </div>
        <div>
          <Label>
            스타일
            <Span>(복수선택)</Span>
          </Label>
          <Dropdown
            value={style}
            placeholder="스타일"
            size="medium"
            options={styleOptions}
          />
        </div>
      </Card>
      <Row>
        <Button
          text="이전 단계"
          buttonType="gray"
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
  color: #ffffffb7;
  ${(props) => props.theme.fonts.b3_regular};
`;

const Card = styled.div`
  width: 100%;
  height: 404px;
  padding: 29px 20px;
  margin-bottom: 55px;
  display: flex;
  flex-direction: column;
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

const Label = styled.div`
  text-align: left;
  color: ${theme.colors.black};
  ${(props) => props.theme.fonts.b2_bold};
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
`;

const Span = styled.span`
  color: ${theme.colors.gray800};
  ${(props) => props.theme.fonts.b3_regular};
`;
