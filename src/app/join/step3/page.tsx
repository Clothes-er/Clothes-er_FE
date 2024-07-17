"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Progressbar from "@/components/common/Progressbar";
import { useNoRequireAuth } from "@/hooks/useNoAuth";
import { setStep3 } from "@/redux/slices/signInSlice";
import { useAppDispatch } from "@/redux/store";
import { postSignUpData } from "@/redux/thunks/postSignIn";
import { theme } from "@/styles/theme";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styled from "styled-components";

const Step3 = () => {
  useNoRequireAuth();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [inputs, setInputs] = useState({
    phone: "",
    phoneAuth: "",
  });

  const [errors, setErrors] = useState({
    phone: "",
    phoneAuth: "",
  });

  const validatePhone = (phone: string) => {
    const regex = /^010-\d{4}-\d{4}$/;
    if (!regex.test(phone)) {
      setErrors({
        ...errors,
        phone: "전화번호 형식이 올바르지 않습니다. ex) 010-2049-0773",
      });
    } else {
      setErrors({ ...errors, phone: "" });
    }
  };

  const handleSignUp = () => {
    dispatch(postSignUpData())
      .unwrap()
      .then((data) => {
        console.log("회원가입 성공:", data);
        router.push("/join/finish");
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
          errorMsg={errors.phone}
          placeholder="010-0000-0000"
          onChange={(value: string) => {
            validatePhone(value);
            setInputs({ ...inputs, phone: value });
            dispatch(
              setStep3({
                ...inputs,
                phone: value,
              })
            );
          }}
        />
        {/* <Small>
          <Button
            buttonType="primaryLight"
            text="인증"
            size="small"
            onClick={() => {}}
          />
        </Small> */}
      </Row>
      {/* <Row>
        <Input
          label="전화번호 인증"
          value={inputs.phoneAuth}
          placeholder="인증번호"
          onChange={(value: string) => {
            setInputs({ ...inputs, phoneAuth: value });
            dispatch(
              setStep3({
                ...inputs,
                phoneAuth: value,
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
      </Row> */}
      <ButtonRow>
        <Button
          text="이전 단계"
          size="medium"
          onClick={() => router.push("/join/step2")}
        />
        <Button text="회원가입" size="medium" onClick={handleSignUp} />
      </ButtonRow>
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

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 22px;
  gap: 14px;
`;
