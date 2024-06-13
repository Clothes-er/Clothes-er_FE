"use client";

import Button from "@/components/common/Button";
import Category from "@/components/common/Category";
import Input from "@/components/common/Input";
import { useRequireAuth } from "@/hooks/useAuth";
import { theme } from "@/styles/theme";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styled from "styled-components";

const Modify = () => {
  useRequireAuth();
  const router = useRouter();

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    gender: "",
    category: "",
    style: "",
    price: [{ days: "", price: "" }],
    brand: "",
    size: "",
    fit: "",
  });

  return (
    <Layout>
      <div>
        <Image
          src="/assets/images/logo_black.svg"
          width={101}
          height={18}
          alt="logo"
          onClick={() => router.push("/home")}
          style={{ cursor: "pointer" }}
        />
        <Top>
          <Image
            src="/assets/icons/ic_arrow.svg"
            width={24}
            height={24}
            alt="back"
            onClick={() => router.back()}
            style={{ cursor: "pointer" }}
          />
          대여 글 작성
        </Top>
        <Content>
          <Photo>
            <AddPhoto>
              <Image
                src="/assets/icons/ic_camera.svg"
                width={24}
                height={24}
                alt="add phote"
              />
            </AddPhoto>
            <Image
              src="/assets/images/post_image.svg"
              width={65}
              height={65}
              alt="photo"
              style={{ cursor: "pointer" }}
            />
          </Photo>
          <Label>카테고리</Label>
          <Category />
          <Column>
            <Label>
              제목<Span>*</Span>
            </Label>
            <Input
              inputType="write"
              value={inputs.title}
              placeholder="제목"
              onChange={(value: string) => {
                setInputs({ ...inputs, title: value });
              }}
            />
          </Column>
          <Column>
            <Label>
              가격<Span>*</Span>
              <AddPrice>
                <Image
                  src="/assets/icons/ic_plus_purple.svg"
                  width={16}
                  height={16}
                  alt="plus"
                />
                가격 추가하기
              </AddPrice>
            </Label>
            {/* <Input
              inputType="write"
              value={inputs.price}
              placeholder="가격"
              onChange={(value: string) => {
                setInputs({ ...inputs, price: value });
              }}
            /> */}
          </Column>
          <Row>
            <Column>
              <Label>브랜드</Label>
              <Input
                inputType="write"
                value={inputs.brand}
                placeholder="없음"
                onChange={(value: string) => {
                  setInputs({ ...inputs, brand: value });
                }}
              />
            </Column>
            <Column>
              <Label>사이즈</Label>
              <Input
                inputType="write"
                value={inputs.size}
                placeholder="직접 입력"
                onChange={(value: string) => {
                  setInputs({ ...inputs, size: value });
                }}
              />
            </Column>
          </Row>
          <Column>
            <Label>핏</Label>
            <Input
              inputType="write"
              value={inputs.fit}
              placeholder="선택 없음"
              onChange={(value: string) => {
                setInputs({ ...inputs, fit: value });
              }}
            />
          </Column>
          <Column>
            <Label>
              상세 설명<Span>*</Span>
            </Label>
            <TextAreaInput
              value={inputs.description}
              placeholder="옷 상태에 대한 자세한 설명 및 구입시기, 착용 횟수 등 신뢰할 수 있는 거래를 위해 정확히 기입 부탁드립니다."
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                setInputs({ ...inputs, description: event.target.value });
              }}
            />
          </Column>
        </Content>
      </div>
      <Button buttonType="primary" size="large" text="작성 완료" disabled />
    </Layout>
  );
};

export default Modify;

const Layout = styled.div`
  width: 100%;
  height: 100vh;
  padding: 37px 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Top = styled.div`
  width: calc(50% + 60px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 18px;
  margin-bottom: 15px;
  ${(props) => props.theme.fonts.h2_bold};
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Photo = styled.div`
  display: flex;
  gap: 11px;
`;

const AddPhoto = styled.div`
  width: 65px;
  height: 65px;
  border-radius: 10px;
  border: 1px solid ${theme.colors.gray700};
  background: ${theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Label = styled.div`
  display: flex;
  gap: 3px;
  ${(props) => props.theme.fonts.c1_bold};
`;

const Span = styled.span`
  color: ${theme.colors.purple700};
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AddPrice = styled.div`
  display: flex;
  align-items: center;
  color: ${theme.colors.purple700};
  ${(props) => props.theme.fonts.c1_medium};
  margin-left: 10px;
  cursor: pointer;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TextAreaInput = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 12px;
  border-radius: 5px;
  border: 1px solid ${theme.colors.gray700};
  background: #fff;
  color: ${theme.colors.b100};
  outline: none;
  resize: none;
  ${(props) => props.theme.fonts.c1_regular};
  &::placeholder {
    color: ${theme.colors.gray600};
  }
`;
