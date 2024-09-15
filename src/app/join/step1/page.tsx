"use client";

import Axios from "@/api/axios";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Progressbar from "@/components/common/Progressbar";
import { useNoRequireAuth } from "@/hooks/useNoAuth";
import { setStep1 } from "@/redux/slices/signInSlice";
import { RootState } from "@/redux/store";
import { theme } from "@/styles/theme";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const Step1 = () => {
  useNoRequireAuth();
  const router = useRouter();
  const dispatch = useDispatch();
  const step1 = useSelector((state: RootState) => state.signIn.step1);

  const [inputs, setInputs] = useState({
    name: "",
    nickname: "",
    email: "",
    emailAuth: "",
  });

  /* 에러 메세지 */
  const [errors, setErrors] = useState({
    name: "",
    nickname: "",
    email: "",
    emailAuth: "",
  });

  /* 성공 메세지 */
  const [success, setSuccess] = useState({
    name: "",
    nickname: "",
    email: "",
    emailAuth: "",
  });

  /* 이메일 발송 여부 */
  const [emailSent, setEmailSent] = useState(false);

  /* 이메일 인증 코드 확인 여부 */
  const [correctCode, setCorrectCode] = useState(false);

  /* 타이머 */
  const [timer, setTimer] = useState<number>(300);
  const [timerColor, setTimerColor] = useState<string>(theme.colors.purple500);

  /* redux 업데이트 */
  useEffect(() => {
    setInputs(step1);
  }, []);

  /* 닉네임 중복확인 */
  useEffect(() => {
    if (inputs.nickname !== "") {
      Axios.get(`/api/v1/users/check-nickname/${inputs.nickname}`)
        .then((response) => {
          console.log("닉네임 중복확인 성공", response.data);
          if (inputs.nickname.length >= 2 && inputs.nickname.length <= 10) {
            setSuccess({ ...success, nickname: "사용가능한 닉네임입니다." });
          } else {
            setSuccess({ ...success, nickname: "" });
            validateNickname(inputs.nickname);
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 409) {
            setSuccess({ ...success, nickname: "" });
            setErrors({ ...errors, nickname: error.response.data.message });
          } else {
            console.log("닉네임 중복확인 실패", error);
          }
        });
    }
  }, [inputs.nickname]);

  /* 유효성 검사 */
  const validateName = (name: string) => {
    if (name.length === 0) {
      setErrors({ ...errors, name: "이름을 입력해주세요." });
    } else if (name.length < 2 || name.length > 10) {
      setErrors({ ...errors, name: "이름은 2~10자입니다." });
    } else {
      setErrors({ ...errors, name: "" });
    }
  };

  const validateNickname = (nickname: string) => {
    if (nickname.length === 0) {
      setErrors({ ...errors, nickname: "닉네임을 입력해주세요." });
    } else if (nickname.length < 2 || nickname.length > 10) {
      setErrors({ ...errors, nickname: "닉네임은 2~10자입니다." });
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

  /* 타이머 */
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (emailSent) {
      intervalId = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 0) {
            clearInterval(intervalId);
            setEmailSent(false);
            setCorrectCode(false);
            setSuccess({ ...success, email: "" });
            setInputs({ ...inputs, emailAuth: "" });
            setErrors({ ...errors, emailAuth: "" });
            setTimer(180);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // 타이머 색상 업데이트
      if (timer <= 30) {
        setTimerColor(theme.colors.red);
      } else {
        setTimerColor(theme.colors.purple500);
      }
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [emailSent, timer]);

  /* 이메일 인증번호 전송 */
  const handleSendEmail = () => {
    Axios.post("/api/v1/users/send-email", { email: inputs.email })
      .then((response) => {
        console.log("이메일 전송 성공", response.data);
        setEmailSent(true);
        setTimer(300);
        setSuccess({ ...success, email: "인증번호가 전송되었습니다." });
        setCorrectCode(false);
        setInputs({ ...inputs, emailAuth: "" });
        setSuccess({ ...success, emailAuth: "" });
        setErrors({ ...errors, emailAuth: "" });
      })
      .catch((error) => {
        console.log("이메일 전송 실패", error);
        setSuccess({ ...success, email: "" });
        setErrors({ ...errors, email: error.response.data.message });
      });
  };

  /* 이메일 인증번호 확인 */
  const handleValidateCode = () => {
    Axios.post("/api/v1/users/check-email", {
      email: inputs.email,
      authCode: inputs.emailAuth,
    })
      .then((response) => {
        console.log("이메일 인증 성공", response.data);
        setCorrectCode(true);
        setSuccess({ ...success, emailAuth: "이메일이 인증되었습니다." });
      })
      .catch((error) => {
        console.log("이메일 인증 실패", error);
        setSuccess({ ...success, emailAuth: "" });
        setErrors({ ...errors, emailAuth: error.response.data.message });
      });
  };

  /* inputs.email 변경 시 correctSendEmail 초기화 */
  useEffect(() => {
    setSuccess({ ...success, email: "" });
  }, [inputs.email]);

  /* 다음 단계 이동 */
  const handleNextStep = () => {
    router.push("/join/step2");
  };

  return (
    <Container>
      <Progressbar step={1} />
      <Hello>
        Clothes:er에 오신 것을
        <br /> 환영합니다!
      </Hello>
      <InputBox>
        <Input
          inputType="text"
          label="이름"
          value={inputs.name}
          size="small"
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
          size="small"
          placeholder="둘리"
          successMsg={success.nickname}
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
            size="small"
            placeholder="이메일"
            successMsg={success.email}
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
          <CheckButton>
            <Button
              buttonType="primaryLight"
              size="small"
              text="인증"
              onClick={handleSendEmail}
            />
          </CheckButton>
        </Row>
        <Row>
          <TimerDiv>
            <Input
              label="이메일 인증"
              value={inputs.emailAuth}
              size="small"
              placeholder="인증번호"
              successMsg={success.emailAuth}
              errorMsg={errors.emailAuth}
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
              disabled={!emailSent}
            />
            {emailSent && !correctCode && (
              <Timer color={timerColor}>{`${Math.floor(timer / 60)}:${String(
                timer % 60
              ).padStart(2, "0")}`}</Timer>
            )}
          </TimerDiv>
          <CheckButton>
            <Button
              buttonType="primaryLight"
              size="small"
              text="확인"
              onClick={handleValidateCode}
              disabled={
                !emailSent || !!errors.emailAuth || inputs.emailAuth === ""
              }
            />
          </CheckButton>
        </Row>
      </InputBox>
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
              inputs.name !== "" &&
              inputs.nickname !== "" &&
              inputs.email !== "" &&
              errors.name == "" &&
              errors.nickname == "" &&
              errors.email == "" &&
              correctCode === true
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
  margin-bottom: 29px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 50px;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
`;

const CheckButton = styled.div`
  margin-bottom: 20px;
`;

const ButtonRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: auto;
  gap: 14px;
  position: sticky;
  bottom: 25px;
  left: 0;
`;

const TimerDiv = styled.div`
  width: 100%;
  height: 90px;
  position: relative;
`;
const Timer = styled.div<{ color: string }>`
  position: absolute;
  bottom: 35px;
  right: 20px;
  font-size: 14px;
  color: ${(props) => props.color};
  margin-top: 10px;
`;
