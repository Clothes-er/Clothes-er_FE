"use client";

import Button from "@/components/common/Button";
import Category from "@/components/common/Category";
import Input from "@/components/common/Input";
import { theme } from "@/styles/theme";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import axios from "axios";
import { getToken } from "@/hooks/getToken";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { clearCategory } from "@/redux/slices/categorySlice";
import { useRequireAuth } from "@/hooks/useAuth";
import Toggle from "@/components/common/Toggle";

const MyClosetWrite = () => {
  useRequireAuth();
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const clothesId = searchParams.get("clothesId");

  const selectedGender = useSelector(
    (state: RootState) => state.category.selectedGender
  );
  const selectedCategory = useSelector(
    (state: RootState) => state.category.selectedCategory
  );
  const selectedStyle = useSelector(
    (state: RootState) => state.category.selectedStyle
  );

  const [images, setImages] = useState<File[]>([]);
  const [inputs, setInputs] = useState<{
    name: string;
    description: string;
    gender: string;
    category: string;
    style: string;
    price: string;
    isPublic: boolean;
    brand: string;
    size: string;
    shoppingUrl: string;
  }>({
    name: "",
    description: "",
    gender: selectedGender || "",
    category: selectedCategory || "",
    style: selectedStyle || "",
    isPublic: true,
    price: "",
    brand: "",
    size: "",
    shoppingUrl: "",
  });

  useEffect(() => {
    console.log(inputs);
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const selectedImages: File[] = Array.from(files).slice(0, 3);
      if (images.length + selectedImages.length > 3) {
        alert("이미지는 최대 3개까지 선택할 수 있습니다.");
        return;
      }
      setImages((prevImages) => [...prevImages, ...selectedImages]);
    }
  };

  const handleImageClick = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleNewPost = () => {
    const formData = new FormData();

    formData.append(
      "clothes",
      new Blob(
        [
          JSON.stringify({
            name: inputs.name,
            description: inputs.description,
            gender: selectedGender,
            category: selectedCategory,
            style: selectedStyle,
            isPublic: inputs.isPublic,
            price: inputs.price,
            brand: inputs.brand,
            size: inputs.size,
            shoppingUrl: inputs.shoppingUrl,
            rentalId: null,
          }),
        ],
        { type: "application/json" }
      )
    );

    images.forEach((file, index) => {
      formData.append(`images`, file, file.name);
    });

    console.log(inputs);
    console.log(images);
    console.log("전달하는 formData", formData);
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    axios
      .post(`/api/v1/clothes`, formData, {
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        console.log(response.data.result);
        dispatch(clearCategory());
        router.push(`/mycloset`);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

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
          옷장 채우기
        </Top>
        <Content>
          <ColumnMargin>
            <Photo>
              <AddPhoto>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                />
                <Image
                  src="/assets/icons/ic_camera.svg"
                  width={24}
                  height={24}
                  alt="add photo"
                />
              </AddPhoto>
              <PhotoList>
                <TransitionGroup component={null}>
                  {images.map((image, index) => (
                    <CSSTransition key={index} timeout={300} classNames="fade">
                      <StyledImage
                        key={index}
                        src={URL.createObjectURL(image)}
                        width={65}
                        height={65}
                        alt={`photo-${index}`}
                        onClick={() => handleImageClick(index)}
                        style={{ cursor: "pointer" }}
                      />
                    </CSSTransition>
                  ))}
                </TransitionGroup>
              </PhotoList>
            </Photo>
          </ColumnMargin>
          <ColumnMargin>
            <Label>카테고리</Label>
            <Category />
          </ColumnMargin>
          <Column>
            <Label>
              상품명<Span>*</Span>
            </Label>
            <Input
              inputType="write"
              size="small"
              value={inputs.name}
              placeholder="제목"
              onChange={(value: string) => {
                setInputs({ ...inputs, name: value });
              }}
            />
          </Column>
          <Row>
            <Column>
              <Label>구매 가격</Label>
              <Input
                inputType="write"
                size="small"
                value={inputs.price}
                placeholder="3,000 원"
                onChange={(value: string) => {
                  setInputs({ ...inputs, price: value });
                }}
              />
            </Column>
            <Column>
              <Label>
                공개 여부<Span>*</Span>
              </Label>
              <Toggle
                isOn={inputs.isPublic}
                onToggle={() =>
                  setInputs({ ...inputs, isPublic: !inputs.isPublic })
                }
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <Label>브랜드</Label>
              <Input
                inputType="write"
                size="small"
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
                size="small"
                value={inputs.size}
                placeholder="직접 입력"
                onChange={(value: string) => {
                  setInputs({ ...inputs, size: value });
                }}
              />
            </Column>
          </Row>
          <Column>
            <Label>구매 링크</Label>
            <Input
              inputType="write"
              size="small"
              value={inputs.shoppingUrl}
              placeholder="url 입력"
              onChange={(value: string) => {
                setInputs({ ...inputs, shoppingUrl: value });
              }}
            />
          </Column>
          <Column>
            <Label>
              옷 후기<Span>*</Span>
            </Label>
            <TextAreaInput
              value={inputs.description}
              placeholder="본인만의 옷 후기를 작성해주세요! 상세하게 적을수록 다른 유저들에게도 많은 도움이 된답니다:)"
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                setInputs({ ...inputs, description: event.target.value });
              }}
            />
          </Column>
        </Content>
      </div>
      <SubmitButton>
        <Button
          buttonType="primary"
          size="large"
          text="작성 완료"
          onClick={handleNewPost}
          // disabled
        />
      </SubmitButton>
    </Layout>
  );
};

export default MyClosetWrite;

const Layout = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding: 37px 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
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
  gap: 5px;
`;

const Photo = styled.div`
  display: flex;
  gap: 11px;
`;

const AddPhoto = styled.label`
  width: 65px;
  height: 65px;
  border-radius: 10px;
  border: 1px solid ${theme.colors.gray700};
  box-shadow: 2px 2px 5px 2px rgba(220, 220, 220, 0.25);
  background: ${theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PhotoList = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledImage = styled(Image)`
  border-radius: 10px;
  box-shadow: 2px 2px 5px 2px rgba(220, 220, 220, 0.25);
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const ColumnMargin = styled(Column)`
  margin-bottom: 10px;
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
  gap: 20px;
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

const SubmitButton = styled.div`
  position: sticky;
  bottom: 20px;
  left: 50%;
`;
