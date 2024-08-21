import { theme } from "@/styles/theme";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

interface BubbleProps {
  text: string;
  onClose: () => void;
}

const Bubble: React.FC<BubbleProps> = ({ text, onClose }) => {
  return (
    <Box>
      {text}
      <CloselIcon
        src="/assets/icons/ic_close.svg"
        width={6}
        height={6}
        alt="close"
        onClick={onClose}
      />
    </Box>
  );
};

export default Bubble;

const Box = styled.div`
  padding: 8px;
  background: ${theme.colors.purple500};
  border-radius: 20px;
  color: ${theme.colors.white};
  ${(props) => props.theme.fonts.c2_medium};
  position: relative;

  &::after {
    position: absolute;
  }
`;

const CloselIcon = styled(Image)`
  position: absolute;
  top: 5px;
  left: 5px;
`;
