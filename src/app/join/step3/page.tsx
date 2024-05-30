"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Progressbar from "@/components/common/Progressbar";
import { setStep3 } from "@/redux/slices/signInSlice";
import { useAppDispatch } from "@/redux/store";
import { postSignUpData } from "@/redux/thunks/postSignIn";
import { theme } from "@/styles/theme";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const Step3 = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [inputs, setInputs] = useState({
    phone: "",
    phoneAuth: "",
  });

  const handleSignUp = () => {
    dispatch(postSignUpData())
      .unwrap()
      .then((data) => {
        console.log("회원가입 성공:", data);
        () => router.push("/join/finish");
      })
      .catch((error) => {
        console.error("회원가입 실패:", error.message);
      });
  };

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
          value={inputs.phone}
          placeholder="전화번호"
          onChange={(value: string) => {
            setInputs({ ...inputs, phone: value });
            dispatch(
              setStep3({
                ...inputs,
                [inputs.phone]: value,
              })
            );
          }}
        />
        <Small>
          <Button
            buttonType="primaryLight"
            text="인증"
            size="small"
            onClick={() => {}}
          />
        </Small>
      </Row>
      <Row>
        <Input
          label="전화번호 인증"
          value={inputs.phoneAuth}
          placeholder="인증번호"
          onChange={(value: string) => {
            setInputs({ ...inputs, phoneAuth: value });
            dispatch(
              setStep3({
                ...inputs,
                [inputs.phoneAuth]: value,
              })
            );
          }}
        />
        <Small>
          <Button
            buttonType="primaryLight"
            text="인증"
            size="small"
            onClick={() => {}}
          />
        </Small>
      </Row>

      <Button text="회원가입" size="medium" onClick={handleSignUp} />
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

const Small = styled.div`
  margin-bottom: 21px;
`;
