"use client";

import Button from "@/components/common/Button";
import Dropdown from "@/components/common/Dropdown";
import Input from "@/components/common/Input";
import RadioButton from "@/components/common/RadioButton";
import { Gender } from "@/interface/Gender";
import { setStep2 } from "@/redux/slices/firstLoginSlice";
import { theme } from "@/styles/theme";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const Step2 = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [height, setHeight] = useState<number | undefined>();
  const [weight, setWeight] = useState<number | undefined>();
  const [foot, setFoot] = useState("");
  const [body, setBody] = useState([""]);

  const genderOptions = ["남자", "여자"];
  const [gender, setGender] = useState<Gender | undefined>();

  const sizeOptions = [
    "210",
    "215",
    "220",
    "225",
    "230",
    "235",
    "240",
    "245",
    "250",
    "255",
    "260",
    "265",
    "270",
    "275",
    "280",
    "285",
    "290",
  ];

  const handleChange = (selectedOption: string) => {
    setGender(selectedOption === "남자" ? Gender.MALE : Gender.FEMALE);
  };

  const handleNext = () => {
    const step2Info = {
      gender: gender,
      height: Number(height),
      weight: Number(weight),
      shoeSize: Number(foot),
      bodyShapes: body,
    };

    dispatch(setStep2(step2Info));
    console.log("step2Info", step2Info);
    router.push("/first/step3");
  };

  const handleFootChange = (selectedFoot: string) => {
    setFoot(selectedFoot);
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
        서비스 이용을 위한
        <br />
        스펙을 입력해주세요.
        <Small>모든 항목은 추후 수정될 수 있습니다.</Small>
      </Story>
      <Card>
        <div>
          <Label>
            기본 정보
            <SpanPurple>*수정 가능</SpanPurple>
          </Label>
          <Gap>
            <RadioButton options={genderOptions} onChange={handleChange} />
            <Row>
              <Input
                value={height}
                placeholder="키"
                size="medium"
                onChange={(value: any) => setHeight(value)}
              />
              <Input
                value={weight}
                placeholder="몸무게"
                size="medium"
                onChange={(value: any) => setWeight(value)}
              />
            </Row>
            <Dropdown
              value={foot}
              dropdownType="single"
              placeholder="발 사이즈"
              size="medium"
              options={sizeOptions}
              setValue={handleFootChange}
            />
          </Gap>
        </div>
        <div>
          <Label>
            체형
            <Span>(,로 복수입력)</Span>
          </Label>
          <Input
            inputType="array"
            value={body}
            placeholder="어깨가 넓어요, 허리가 길어요"
            size="medium"
            onChange={(value: string[]) => setBody(value)}
          />
        </div>
      </Card>
      <Row>
        <Button
          text="이전 단계"
          buttonType="gray"
          size="medium"
          onClick={() => router.push("/first/step1")}
        />
        <Button
          text="다음 단계"
          buttonType="primaryDeep"
          size="medium"
          onClick={handleNext}
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
  overflow-x: hidden;
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
  padding: 29px 20px;
  margin-bottom: 55px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  border-radius: 15px;
  background: ${theme.colors.white};
  box-shadow: 0px 4px 30px 0px rgba(171, 171, 171, 0.25);
  z-index: 10;
`;

const Gap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
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

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
`;

const Span = styled.span`
  color: ${theme.colors.gray800};
  ${(props) => props.theme.fonts.b3_regular};
`;

const SpanPurple = styled.span`
  color: ${theme.colors.purple400};
  ${(props) => props.theme.fonts.b3_regular};
`;
