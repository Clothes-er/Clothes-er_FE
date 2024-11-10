import { patchReadNotification } from "@/api/notifications";
import { theme } from "@/styles/theme";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styled from "styled-components";

interface NotiList {
  id: number;
  image: string | null;
  title: string;
  content: string;
  type: string;
  sourceId: string;
  isRead: boolean;
}

const NotiBox = (props: NotiList) => {
  const { id, image, title, content, type, sourceId, isRead } = props;

  const router = useRouter();
  const [read, setRead] = useState<boolean>(isRead);

  const handleReadNotification = async () => {
    if (!isRead) {
      try {
        await patchReadNotification(id);
        setRead(true);
        // router.push(); // 클릭 시 이동 경로 설정
      } catch {}
    }
  };

  return (
    <Container $isRead={read} onClick={handleReadNotification}>
      <Left>
        <NotiImage
          src={image || "/icon-192x192.png"}
          width={60}
          height={60}
          alt="이미지"
        />
      </Left>
      <Right>
        <Title>{title}</Title>
        <Content>{content}</Content>
      </Right>
    </Container>
  );
};

export default NotiBox;

const Container = styled.div<{ $isRead: boolean }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding: 16px 22px;

  ${({ $isRead, theme }) =>
    $isRead &&
    `
      background: ${theme.colors.purple50};
      opacity: 0.7;
    `}
`;
const Left = styled.div`
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NotiImage = styled(Image)`
  border-radius: 50%;
`;

const Right = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
`;

const Title = styled.div`
  color: ${theme.colors.b100};
  ${theme.fonts.b2_semiBold};
`;

const Content = styled.div`
  color: ${theme.colors.b100};
  ${theme.fonts.b3_regular};
`;
