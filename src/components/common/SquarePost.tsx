import { theme } from "@/styles/theme";
import { ClosetPostList } from "@/type/post";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled, { css } from "styled-components";

const SquarePost: React.FC<ClosetPostList> = (props) => {
  const router = useRouter();
  const { id, userSid, nickname, imgUrl, name, brand, createdAt } = props;
  const [heart, setHeart] = useState<boolean>(false);

  const handleMorePost = (id: number) => {
    router.push(nickname ? `/closet/${id}` : `mycloset/${id}`);
  };

  const handleMoreProfile = (userSid: string) => {
    router.push(`/user/${id}`);
  };

  return (
    <Container onClick={() => handleMorePost(id)}>
      <ImageBox>
        <StyledImage
          src={imgUrl || "/assets/images/noImage.svg"}
          layout="fill"
          alt="image"
        />
        {/* <HeartImage
          src={`/assets/icons/ic_heart${heart ? "_fill" : ""}.svg`}
          width={20}
          height={20}
          alt="storage"
          onClick={() => {
            setHeart(!heart);
          }}
        /> */}
      </ImageBox>
      <Title>{name}</Title>
      <Sub>
        {nickname ? (
          <>
            <Span onClick={() => handleMoreProfile(userSid)}>{nickname}</Span>{" "}
            님 | {createdAt}
          </>
        ) : (
          <>
            <Span $disabled={!brand}>{brand ? brand : "미기재"}</Span> |{" "}
            {createdAt}
          </>
        )}
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

const Span = styled.span<{ $disabled?: boolean }>`
  color: ${theme.colors.purple600};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  ${({ $disabled }) =>
    $disabled &&
    css`
      color: ${theme.colors.b100};
      cursor: auto;
      &:hover {
        text-decoration: none;
      }
    `}
`;
