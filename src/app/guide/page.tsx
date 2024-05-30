"use client";
import Button from "@/components/common/Button";
import Checkbox from "@/components/common/Checkbox";
import Input from "@/components/common/Input";
import Modal from "@/components/common/Modal";
import RadioButton from "@/components/common/RadioButton";
import { useState } from "react";
import styled from "styled-components";

const Guide = () => {
  const [name, setName] = useState("");
  const gender = ["남자", "여자"];
  const [selectedOption, setSelectedOption] = useState(gender[0]);

  const handleChange = (selectedOption: string) => {
    setSelectedOption(selectedOption);
  };

  return (
    <>
      <Layout>
        <h2>Input</h2>
        <Input
          label="이름"
          value={name}
          placeholder="홍길동"
          onChange={(value: string) => setName(value)}
        />
        <Input
          label="이름"
          value={name}
          placeholder="홍길동"
          onChange={(value: string) => setName(value)}
          errorMsg="이름을 입력해주세요"
        />
        <h2>Checkbox</h2>
        <Checkbox label="서비스 이용약관" text="필수" />
        <Checkbox checkboxType="checkBtn" label="서비스 이용약관" text="필수" />
        <Checkbox
          checkboxType="checkArrow"
          label="서비스 이용약관"
          text="필수"
        />
        <h2>Button</h2>
        <Button buttonType="primary" size="large" text="다음 단계" />
        <Button buttonType="primaryLight" size="medium" text="인증" />
        <h2>Modal</h2>
        <Modal title="정말 제출하시겠습니까?" text="원활한 서비스 어쩌구" />
        <h2>Radio Choice</h2>
        <RadioButton options={gender} onChange={handleChange} />
      </Layout>
    </>
  );
};

export default Guide;

const Layout = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 42px 20px;
  display: flex;
  flex-direction: column;
  gap: 23px;
  position: relative;
`;
