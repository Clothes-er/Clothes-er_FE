"use client";

import { theme } from "@/styles/theme";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from "styled-components";

export interface TopbarProps {
  text: string;
  icon?: boolean;
  link?: string;
  fontSize?: keyof typeof theme.fonts;
  align: "left" | "center";
}

const Topbar = (props: TopbarProps) => {
  const {
    text,
    icon = false,
    link,
    fontSize = "h2_bold",
    align = "left",
  } = props;
  const router = useRouter();

  const handleBackButtonClick = () => {
    if (link) {
      router.push(link);
    } else {
      router.back();
    }
  };

  return (
    <Container>
      {icon && (
        <Image
          src="/assets/icons/ic_arrow.svg"
          width={24}
          height={24}
          alt="back"
          onClick={handleBackButtonClick}
        />
      )}
      <Text $align={align} $fontSize={fontSize}>
        {text}
      </Text>
    </Container>
  );
};

export default Topbar;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1.2rem 0;

  img {
    cursor: pointer;
  }
  color: ${({ theme }) => theme.colors.black};
`;

const Text = styled.div<{
  $align: string;
  $fontSize: keyof typeof theme.fonts;
}>`
  width: 100%;
  text-align: ${(props) => props.$align};
  ${({ $fontSize, theme }) => theme.fonts[$fontSize]};
`;
