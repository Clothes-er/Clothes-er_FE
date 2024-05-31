import { PostList } from "@/data/homeData";
import { theme } from "@/styles/theme";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import styled from "styled-components";

const Post: React.FC<PostList> = ({
  imgUrl,
  nickname,
  title,
  minPrice,
  createdAt,
}) => {
  const router = useRouter();
  const handleDetail = () => {
    router.push(`/home/1`);
  };
  return (
    <Container onClick={handleDetail}>
      <Image
        src="/assets/images/post_image.svg"
        width={76}
        height={76}
        alt="image"
      />
      <Box>
        <Title>{title}</Title>
        <Price>{minPrice}원~</Price>
        <Sub>
          {createdAt} | <Span>{nickname}</Span> 님
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
  cursor: pointer;
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

const Span = styled.span`
  color: ${theme.colors.purple400};
`;