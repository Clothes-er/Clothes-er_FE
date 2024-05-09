"use client";
import Button from "@/components/common/Button";
import Checkbox from "@/components/common/Checkbox";
import Input from "@/components/common/Input";
import Modal from "@/components/common/Modal";
import { useState } from "react";
import styled from "styled-components";

const Home = () => {
  const [name, setName] = useState("");
  return (
    <>
      <Layout>
        홈
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
        <Checkbox label="서비스 이용약관" text="필수" />
        <Checkbox checkboxType="checkBtn" label="서비스 이용약관" text="필수" />
        <Checkbox
          checkboxType="checkArrow"
          label="서비스 이용약관"
          text="필수"
        />
        <Button buttonType="primary" size="large" text="다음 단계" />
        <Button buttonType="primaryLight" size="medium" text="인증" />
        <Modal title="정말 제출하시겠습니까?" text="원활한 서비스 어쩌구" />
      </Layout>
    </>
  );
};

export default Home;

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
