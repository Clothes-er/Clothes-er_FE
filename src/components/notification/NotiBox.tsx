import { theme } from "@/styles/theme";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

interface NotiList {
  id: number;
  type: string;
  url: string;
  content: string;
  image: string;
}

const NotiBox = (props: NotiList) => {
  const { id, type, url, image, content } = props;
  return (
    <Container>
      <Left>
        <NotiImage
          src="/icon-192x192.png"
          width={70}
          height={70}
          alt="이미지"
        />
      </Left>
      <Right>
        <Type>{type}</Type>
        <Content>{content}</Content>
      </Right>
    </Container>
  );
};

export default NotiBox;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 16px 22px;
`;

const Left = styled.div`
  width: 70px;
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

const Type = styled.div`
  color: ${theme.colors.b100};
  ${theme.fonts.b2_semiBold};
`;

const Content = styled.div`
  color: ${theme.colors.b100};
  ${theme.fonts.b3_regular};
`;
