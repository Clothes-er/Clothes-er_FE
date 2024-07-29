import { PostList } from "@/data/homeData";
import { theme } from "@/styles/theme";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import styled, { css } from "styled-components";

const Post: React.FC<PostList> = ({
  id,
  postType = "share",
  imgUrl,
  nickname,
  title,
  minPrice,
  isDeleted = false,
  isReviewed = false, // 후기 작성 여부 (후기 보내기, 작성 완료)
  showReviewed = false, // 후기 버튼 유무
  onClickReview,
  createdAt,
  startDate,
  endDate,
  size = "nomal",
}) => {
  const router = useRouter();

  const handleDetail = () => {
    if (!isDeleted) {
      router.push(`/home/${id}`);
    }
  };

  return (
    <Container onClick={handleDetail} size={size}>
      <Image
        src={`${imgUrl ? imgUrl : "/assets/images/noImage.svg"}`}
        width={size === "small" ? 60 : 76}
        height={size === "small" ? 60 : 76}
        alt="profile"
        style={{ borderRadius: "10px" }}
      />
      <Box>
        <Title>{title}</Title>
        <Row>
          <Price>{isDeleted ? "삭제된 게시물입니다" : `${minPrice}원~`}</Price>
          {showReviewed && (
            <ReviewButton onClick={onClickReview} disabled={isReviewed}>
              <Image
                src="/assets/icons/ic_review.svg"
                width={12}
                height={12}
                alt="review"
                style={{ borderRadius: "10px" }}
              />
              {isReviewed ? "후기 작성 완료" : "후기 작성하기"}
            </ReviewButton>
          )}
        </Row>
        <Sub>
          {postType === "share" ? createdAt : `${startDate}~${endDate}`}{" "}
          {nickname && (
            <>
              | <Span>{nickname}</Span> 님
            </>
          )}
        </Sub>
      </Box>
    </Container>
  );
};

export default Post;

const Container = styled.div<{ size: string }>`
  display: flex;
  width: 100%;
  height: 100px;
  padding: 24px 8px;
  justify-content: flex-start;
  align-items: center;
  gap: 19px;
  ${(props) =>
    props.size === "small" &&
    css`
      border-bottom: 0.5px solid rgba(219, 219, 219, 0.7);
    `}
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

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Price = styled.div`
  color: ${theme.colors.purple400};
  ${(props) => props.theme.fonts.b2_bold};
`;

const ReviewButton = styled.button`
  height: 28px;
  padding: 5px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border: 0.5px solid ${theme.colors.gray700};
  background: ${theme.colors.white};
  color: ${theme.colors.b100};
  ${(props) => props.theme.fonts.c1_medium};

  &:disabled {
    background: ${theme.colors.gray100};
  }
`;

const Sub = styled.div`
  color: ${theme.colors.gray400};
  ${(props) => props.theme.fonts.c2_regular};
`;

const Span = styled.span`
  color: ${theme.colors.purple400};
`;
