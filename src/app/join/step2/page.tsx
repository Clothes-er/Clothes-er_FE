"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Progressbar from "@/components/common/Progressbar";
import { setStep2 } from "@/redux/slices/signInSlice";
import { RootState } from "@/redux/store";
import { theme } from "@/styles/theme";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const Step2 = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const step2 = useSelector((state: RootState) => state.signIn.step2);

  const [inputs, setInputs] = useState({
    password: "",
    repassword: "",
    birth: "",
  });
  const [errors, setErrors] = useState({
    password: "",
    repassword: "",
    birth: "",
  });

  useEffect(() => {
    setInputs(step2);
  }, []);

  /* 유효성 검사 */
  const validatePassword = (password: string) => {
    const reg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{8,15}$/;
    if (!reg.test(password)) {
      setErrors({
        ...errors,
        password: "영문, 숫자, 특수문자 포함 8~15자 이내로 설정해주세요.",
      });
    } else {
      setErrors({ ...errors, password: "" });
    }
  };

  const validateRepassword = (repassword: string) => {
    if (repassword.length === 0) {
      setErrors({
        ...errors,
        repassword: "비밀번호를 다시 한번 입력해주세요.",
      });
    } else if (repassword !== inputs.password) {
      setErrors({ ...errors, repassword: "비밀번호가 일치하지 않습니다." });
    } else {
      setErrors({ ...errors, repassword: "" });
    }
  };

  const validateBirth = (birth: string) => {
    if (birth.length === 0) {
      setErrors({
        ...errors,
        repassword: "생년월일을 입력해주세요.",
      });
    } else {
      setErrors({ ...errors, birth: "" });
    }
  };

  return (
    <Container>
      <Progressbar step={2} />
      <Hello>
        Clothes:er에 오신 것을
        <br /> 환영합니다!
      </Hello>
      <Input
        label="비밀번호"
        inputType="password"
        value={inputs.password}
        placeholder="비밀번호"
        onChange={(value: string) => {
          validatePassword(value);
          setInputs({ ...inputs, password: value });
          dispatch(
            setStep2({
              ...inputs,
              [inputs.password]: value,
            })
          );
        }}
      />
      <Input
        label="비밀번호 재입력"
        inputType="password"
        value={inputs.repassword}
        placeholder="비밀번호"
        onChange={(value: string) => {
          validateRepassword(value);
          setInputs({ ...inputs, repassword: value });
          dispatch(
            setStep2({
              ...inputs,
              [inputs.repassword]: value,
            })
          );
        }}
      />
      <Input
        label="생년월일"
        value={inputs.birth}
        placeholder="YYYY/MM/DD"
        onChange={(value: string) => {
          validateBirth(value);
          setInputs({ ...inputs, birth: value });
          dispatch(
            setStep2({
              ...inputs,
              [inputs.birth]: value,
            })
          );
        }}
      />
      <Row>
        <Button
          text="이전 단계"
          size="medium"
          onClick={() => router.push("/join/step1")}
        />
        <Button
          text="다음 단계"
          size="medium"
          onClick={() => router.push("/join/step3")}
          disabled={
            !(
              errors.password !== "" ||
              errors.repassword !== "" ||
              errors.birth !== ""
            )
          }
        />
      </Row>
    </Container>
  );
};

export default Step2;

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
  padding: 46px;
  justify-content: space-between;
  gap: 24px;
`;
