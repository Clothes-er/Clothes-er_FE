import { theme } from "@/styles/theme";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";

const SquarePost = () => {
  const [heart, setHeart] = useState<boolean>(false);

  return (
    <Container>
      <ImageBox>
        <StyledImage
          src={`/assets/images/post_image.svg`}
          layout="fill"
          alt="image"
        />
        <HeartImage
          src={`/assets/icons/ic_heart${heart ? "_fill" : ""}.svg`}
          width={20}
          height={20}
          alt="storage"
          onClick={() => {
            setHeart(!heart);
          }}
        />
      </ImageBox>
      <Title>스퀘어 아이보리 블라우스</Title>
      <Sub>
        1일 전 | <Span>러블리걸</Span> 님
      </Sub>
    </Container>
  );
};

export default SquarePost;

const Container = styled.div`
  width: 100%;
  height: 184px;
`;

const ImageBox = styled.div`
  width: 100%;
  height: 140px;
  position: relative;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const HeartImage = styled(Image)`
  position: absolute;
  top: 11px;
  right: 11px;
  z-index: 10;
`;

const Title = styled.div`
  margin-top: 10px;
  margin-bottom: 3px;
  color: #242029;
  ${(props) => props.theme.fonts.b3_semiBold};
`;

const Sub = styled.div`
  color: ${theme.colors.gray700};
  ${(props) => props.theme.fonts.c2_regular};
`;

const Span = styled.span`
  color: ${theme.colors.purple600};
`;
