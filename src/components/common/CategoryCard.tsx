import { theme } from "@/styles/theme";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

interface CategoryCardProps {
  keyword: string;
  description: string;
  image: string;
  color: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  keyword,
  description,
  image,
  color,
}) => {
  return (
    <Box>
      <Text>
        <Keyword>{keyword}</Keyword>
        <Description>{description}</Description>
      </Text>
      <IconImage src={image} width={31} height={31} alt={keyword} />
      <BackgroundImage
        src="/assets/images/category/background.svg"
        width={42}
        height={32}
        alt={keyword}
        $color={color}
      />
    </Box>
  );
};

export default CategoryCard;

const Box = styled.div`
  width: 163px;
  height: 64px;
  padding: 8px 12px;
  border-radius: 5px;
  border: 1px solid ${theme.colors.gray100};
  background: ${theme.colors.white};
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.05);
  position: relative;
  flex-shrink: 0;
  flex-grow: 1;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
`;

const Keyword = styled.div`
  color: ${theme.colors.gray950};
  ${(props) => props.theme.fonts.b3_semiBold};
`;

const Description = styled.div`
  color: ${theme.colors.gray950};
  ${(props) => props.theme.fonts.c2_medium};
  z-index: 100;
`;

const IconImage = styled(Image)`
  position: absolute;
  bottom: 8px;
  right: 8px;
  z-index: 10;
`;

const BackgroundImage = styled(Image)<{ $color: string }>`
  position: absolute;
  bottom: 3px;
  right: 3px;

  svg path {
    fill: color;
  }
`;
