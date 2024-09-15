import { theme } from "@/styles/theme";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface ChipProps {
  label: string | string[];
  value?: string | string[];
  onClick?: (value: any) => void;
}

const Chip: React.FC<ChipProps> = ({ label, value, onClick }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <StyledChip $hasValue={!!value} onClick={onClick}>
      {value || label}
      {isMounted ? (
        value ? (
          <Image
            src="/assets/icons/ic_chevron_down.svg"
            width={10}
            height={14}
            alt="more"
          />
        ) : (
          <Image
            src="/assets/icons/ic_chevron_down_gray.svg"
            width={10}
            height={14}
            alt="more"
          />
        )
      ) : null}
    </StyledChip>
  );
};

export default Chip;

const StyledChip = styled.div<{ $hasValue: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 19px;
  padding: 3px 5px 3px 8px;
  gap: 2px;
  border-radius: 15px;
  border: 1px solid
    ${({ $hasValue }) => ($hasValue ? "transparent" : theme.colors.gray500)};
  background: ${({ $hasValue }) =>
    $hasValue ? theme.colors.linear_purple : theme.colors.white};
  color: ${({ $hasValue }) =>
    $hasValue ? theme.colors.white : theme.colors.gray900};
  ${(props) => props.theme.fonts.c1_medium};
  cursor: pointer;
  white-space: nowrap;
`;
