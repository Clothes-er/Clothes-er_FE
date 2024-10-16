import { deleteClothesLike, postClothesLike } from "@/api/like";
import { theme } from "@/styles/theme";
import { ClosetPostList } from "@/type/post";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled, { css } from "styled-components";

const SquarePost: React.FC<ClosetPostList> = (props) => {
  const router = useRouter();
  const {
    id,
    userSid,
    nickname,
    imgUrl,
    name,
    brand,
    createdAt,
    isLikeList = false,
    isLiked = false,
  } = props;
  const [heart, setHeart] = useState<boolean>(isLiked);

  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "";

  const handleMorePost = (id: number) => {
    if (isLikeList || currentPath.startsWith("/user")) {
      router.push(`/closet/${id}`);
    } else if (currentPath.startsWith("/mycloset")) {
      router.push(`/mycloset/${id}`);
    } else {
      router.push(nickname ? `/closet/${id}` : `/mycloset/${id}`);
    }
  };

  const handleMoreProfile = (userSid: string) => {
    router.push(`/user/${id}`);
  };

  const handlePickHeart = async (event: React.MouseEvent<HTMLImageElement>) => {
    event.stopPropagation();
    // 찜하기 API
    if (id) {
      if (heart) {
        await deleteClothesLike(id);
        setHeart(false);
      } else {
        await postClothesLike(id);
        setHeart(true);
      }
    }
  };

  return (
    <Container onClick={() => handleMorePost(id)}>
      <ImageBox>
        <StyledImage
          src={imgUrl || "/assets/images/noImage.svg"}
          fill
          alt="image"
        />
        {isLikeList && (
          <HeartImage
            src={`/assets/icons/ic_heart${heart ? "_fill" : ""}.svg`}
            width={20}
            height={20}
            alt="찜"
            onClick={handlePickHeart}
          />
        )}
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
  width: 100%;
  max-width: 210px;
  min-width: 140px;
  margin-top: 10px;
  margin-bottom: 3px;
  color: #242029;
  ${(props) => props.theme.fonts.b3_semiBold};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
