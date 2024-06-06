"use client";

import Axios from "@/api/axios";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Progressbar from "@/components/common/Progressbar";
import { setStep1 } from "@/redux/slices/signInSlice";
import { RootState } from "@/redux/store";
import { theme } from "@/styles/theme";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const Step1 = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const step1 = useSelector((state: RootState) => state.signIn.step1);

  const [inputs, setInputs] = useState({
    name: "",
    nickname: "",
    email: "",
    emailAuth: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    nickname: "",
    email: "",
    emailAuth: "",
  });

  useEffect(() => {
    setInputs(step1);
  }, []);

  /* 닉네임 중복확인 */
  useEffect(() => {
    if (inputs.nickname !== "") {
      Axios.get(`/api/v1/users/check-nickname/${inputs.nickname}`)
        .then((response) => {
          console.log("닉네임 중복확인 성공", response.data);
          setErrors({ ...errors, nickname: response.data.message });
        })
        .catch((error) => {
          if (error.response && error.response.status === 409) {
            setErrors({ ...errors, nickname: error.response.data.message });
          } else {
            console.log("닉네임 중복확인 실패", error);
          }
        });
    }
  }, [inputs.nickname]);

  /* 이메일 발송 여부 */
  const [emailSent, setEmailSent] = useState(false);

  /* 유효성 검사 */
  const validateName = (name: string) => {
    if (name.length === 0) {
      setErrors({ ...errors, name: "이름을 입력해주세요." });
    } else {
      setErrors({ ...errors, name: "" });
    }
  };

  const validateNickname = (nickname: string) => {
    if (nickname.length === 0) {
      setErrors({ ...errors, nickname: "닉네임을 입력해주세요." });
    } else {
      setErrors({ ...errors, nickname: "" });
    }
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setErrors({ ...errors, email: "올바른 이메일을 입력해주세요." });
    } else if (email.length === 0) {
      setErrors({ ...errors, email: "이메일을 입력해주세요." });
    } else {
      setErrors({ ...errors, email: "" });
    }
  };

  const validateEmailAuth = (emailAuth: string) => {
    if (emailAuth.length !== 6) {
      setErrors({ ...errors, emailAuth: "인증번호 6자리를 입력해주세요." });
    } else {
      setErrors({ ...errors, emailAuth: "" });
    }
  };

  /* 이메일 인증번호 전송 */
  const handleSendEmail = () => {
    alert("인증 이메일이 전송되었습니다.");
  };

  /* 다음 단계 이동 */
  const handleNextStep = () => {
    router.push("/join/step2");
    // if (emailSent && inputs.emailAuth) {
    //   router.push("/join/step2");
    // } else {
    //   alert("이메일을 인증해주세요.");
    // }
  };

  return (
    <Container>
      <Progressbar step={1} />
      <Hello>
        Clothes:er에 오신 것을
        <br /> 환영합니다!
      </Hello>
      <Input
        label="이름"
        value={inputs.name}
        size="medium"
        placeholder="홍길동"
        errorMsg={errors.name}
        onChange={(value: string) => {
          validateName(value);
          setInputs({ ...inputs, name: value });
          dispatch(
            setStep1({
              ...inputs,
              [inputs.name]: value,
            })
          );
        }}
      />
      <Input
        label="닉네임"
        value={inputs.nickname}
        size="medium"
        placeholder="둘리"
        errorMsg={errors.nickname}
        onChange={(value: string) => {
          validateNickname(value);
          setInputs({ ...inputs, nickname: value });
          dispatch(
            setStep1({
              ...inputs,
              nickname: value,
            })
          );
        }}
      />
      <Row>
        <Input
          label="이메일"
          value={inputs.email}
          size="medium"
          placeholder="이메일"
          errorMsg={errors.email}
          onChange={(value: string) => {
            validateEmail(value);
            setInputs({ ...inputs, email: value });
            dispatch(
              setStep1({
                ...inputs,
                email: value,
              })
            );
          }}
        />
        <Small>
          <Button
            buttonType="primaryLight"
            size="small"
            text="인증"
            onClick={handleSendEmail}
            disabled={!inputs.email}
          />
        </Small>
      </Row>
      <Row>
        <Input
          label="이메일 인증"
          value={inputs.emailAuth}
          size="medium"
          placeholder="인증번호"
          onChange={(value: string) => {
            validateEmailAuth(value);
            setInputs({ ...inputs, emailAuth: value });
            dispatch(
              setStep1({
                ...inputs,
                emailAuth: value,
              })
            );
          }}
        />
        <Small>
          <Button
            buttonType="primaryLight"
            size="small"
            text="확인"
            onClick={handleSendEmail}
            disabled={!inputs.email}
          />
        </Small>
      </Row>
      <ButtonRow>
        <Button
          text="이전 단계"
          size="medium"
          onClick={() => router.push("/join/terms")}
        />
        <Button
          text="다음 단계"
          size="medium"
          onClick={handleNextStep}
          disabled={
            !(
              errors.name !== "" ||
              errors.nickname !== "" ||
              errors.email !== "" ||
              errors.emailAuth !== ""
            )
          }
        />
      </ButtonRow>
    </Container>
  );
};

export default Step1;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Hello = styled.div`
  text-align: left;
  color: ${theme.colors.b500};
  ${(props) => props.theme.fonts.h2_bold};
  margin-bottom: 24px;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
`;

const ButtonRow = styled.div`
  display: flex;
  padding: 46px;
  justify-content: center;
  gap: 24px;
`;

const Small = styled.div`
  margin-bottom: 21px;
`;
