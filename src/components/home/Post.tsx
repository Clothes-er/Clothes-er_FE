import { theme } from "@/styles/theme";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

const Post = () => {
  return (
    <Container>
      <Image
        src="/assets/images/post_image.svg"
        width={76}
        height={76}
        alt="image"
      />
      <Box>
        <Title>스퀘어 아이보리 블라우스</Title>
        <Price>3,000원~</Price>
        <Sub>
          1일전 | <span>러블리걸</span> 님
        </Sub>
      </Box>
    </Container>
  );
};

export default Post;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  padding: 24px 8px;
  justify-content: flex-start;
  align-items: center;
  gap: 19px;
  border-top: 0.5px solid rgba(219, 219, 219, 0.7);
  border-bottom: 0.5px solid rgba(219, 219, 219, 0.7);
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 4px;
`;

const Title = styled.div`
  color: ${theme.colors.black};
  ${(props) => props.theme.fonts.b2_medium};
`;

const Price = styled.div`
  color: ${theme.colors.purple400};
  ${(props) => props.theme.fonts.b2_bold};
`;

const Sub = styled.div`
  color: ${theme.colors.gray400};
  ${(props) => props.theme.fonts.c2_regular};
`;
