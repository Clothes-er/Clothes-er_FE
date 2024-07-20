"use client";

import { theme } from "@/styles/theme";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from "styled-components";

export interface TopbarProps {
  text: string;
  icon?: boolean;
  link?: string;
  align: "left" | "center";
}

const Topbar = (props: TopbarProps) => {
  const { text, icon = false, link, align = "left" } = props;
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
      <Text $align={align}>{text}</Text>
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
  ${({ theme }) => theme.fonts.h2_bold};
  color: ${({ theme }) => theme.colors.b500};
`;

const Text = styled.div<{ $align: string }>`
  width: 100%;
  text-align: ${(props) => props.$align};
`;
