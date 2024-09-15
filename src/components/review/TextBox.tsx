import { theme } from "@/styles/theme";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { TextProps } from "./ReviewPage";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

const TextBox: React.FC<TextProps> = ({
  nickname,
  profileUrl,
  userSid,
  content,
  createdAt,
}) => {
  const router = useRouter();

  return (
    <Box>
      <Image
        src={profileUrl}
        width={45}
        height={45}
        alt="user"
        style={{ borderRadius: "50%" }}
        onClick={() => {
          router.push(`/user/${userSid}`);
        }}
      />
      <Right>
        <Top>
          <Nickname
            onClick={() => {
              router.push(`/user/${userSid}`);
            }}
          >
            {nickname}
          </Nickname>
          <Time>{createdAt}</Time>
        </Top>
        <Content>{content}</Content>
      </Right>
    </Box>
  );
};

export default TextBox;

const Box = styled.div`
  width: 100%;
  padding: 15px 25px 15px 15px;
  border-radius: 10px;
  background: ${theme.colors.white};
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 18px;
`;

const Right = styled.div`
  width: calc(100% - 63px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 5px;
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  color: ${theme.colors.purple500};
`;

const Nickname = styled.div`
  color: ${theme.colors.b500};
  ${(props) => props.theme.fonts.b2_bold};
`;

const Time = styled.div`
  color: ${theme.colors.gray950};
  ${(props) => props.theme.fonts.c1_regular};
  white-space: nowrap;
`;

const Content = styled.div`
  color: #383838;
  ${(props) => props.theme.fonts.b2_regular};
`;
