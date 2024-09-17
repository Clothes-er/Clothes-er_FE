"use client";

import AuthAxios from "@/api/authAxios";
import Button from "@/components/common/Button";
import Dropdown from "@/components/common/Dropdown";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import Topbar from "@/components/common/Topbar";
import {
  REPORT_REASON_CHAT,
  REPORT_REASON_CLOSET,
  REPORT_REASON_RENTAL,
} from "@/constants/report";
import { showToast } from "@/hooks/showToast";
import { theme } from "@/styles/theme";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import styled from "styled-components";

const ReportPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  /* type, userSid, nickname */
  const type = searchParams.get("type");
  const userSid = searchParams.get("userSid");
  const nickname = searchParams.get("nickname");

  const [reason, setReason] = useState<string>();
  const [content, setContent] = useState<string>();

  const reasonOptions = (type: string | null) => {
    switch (type) {
      case "rental":
        return REPORT_REASON_RENTAL.map((item) => item.reason);
      case "chat":
        return REPORT_REASON_CHAT.map((item) => item.reason);
      case "closet":
        return REPORT_REASON_CLOSET.map((item) => item.reason);
      default:
        break;
    }
  };

  /* 신고하기 */
  const handleReport = () => {
    AuthAxios.post(`/api/v1/users/report`, {
      userSid: userSid,
      reason: reason,
      content: content,
    })
      .then((response) => {
        console.log(response.data);
        console.log(response.data.message);
        showToast({
          text: "신고가 성공적으로 이루어졌습니다.",
          icon: "💜",
          type: "success",
        });
        router.back();
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data.message);
      });
  };

  return (
    <>
      <Layout>
        <Image
          src="/assets/images/logo_black.svg"
          width={101}
          height={18}
          alt="logo"
          onClick={() => router.push("/home")}
          style={{ cursor: "pointer" }}
        />
        <Topbar text="신고하기" align="center" icon={true} />
        <Main>
          <Title>{nickname} 님을 신고하시겠습니까?</Title>
          <Caution>
            {`*신고 접수 시, 확인을 통해\n점수 삭감 및 서비스 이용 제한이 적용됩니다.`}
          </Caution>
          <Dropdown
            value={reason}
            dropdownType="single"
            placeholder="신고사유"
            options={reasonOptions(type) || []}
            setValue={(selectedValue) => setReason(selectedValue)}
          />
          <TextAreaInput
            value={content}
            placeholder="신고 내용을 상세히 입력해주세요."
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
              setContent(event.target.value);
            }}
          />
        </Main>
        <Row>
          <Button
            text="취소하기"
            buttonType="gray"
            size="medium"
            onClick={() => router.back()}
          />
          <Button
            text="신고하기"
            buttonType="primaryDeep"
            size="medium"
            onClick={handleReport}
            disabled={!reason || !content}
          />
        </Row>
      </Layout>
    </>
  );
};

export default function ReportPaging() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ReportPage />
    </Suspense>
  );
}

const Layout = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  padding: 42px 20px;
  display: flex;
  flex-direction: column;
  gap: 23px;
  position: relative;
`;

const Main = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  color: ${theme.colors.black};
  ${(props) => props.theme.fonts.b2_medium};
  margin-bottom: 14px;
`;

const Caution = styled.div`
  text-align: center;
  color: ${theme.colors.purple400};
  ${(props) => props.theme.fonts.b3_regular};
  margin-bottom: 48px;
`;

const Row = styled.div`
  width: calc(100% - 40px);
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  gap: 24px;
`;

const TextAreaInput = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 12px 18px;
  border-radius: 5px;
  border: 1px solid ${theme.colors.gray400};
  background: #fff;
  color: ${theme.colors.b100};
  outline: none;
  resize: none;
  margin-top: 20px;
  ${(props) => props.theme.fonts.b2_regular};
  &::placeholder {
    color: ${theme.colors.gray900};
  }
`;
