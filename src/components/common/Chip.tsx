import { theme } from "@/styles/theme";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

interface ChipProps {
  label: string;
  value?: string;
}

const Chip: React.FC<ChipProps> = ({ label, value }) => {
  return (
    <StyledChip hasValue={!!value}>
      {value || label}
      {value ? (
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
      )}
    </StyledChip>
  );
};

export default Chip;

interface StyledChipProps {
  hasValue: boolean;
}

const StyledChip = styled.div<StyledChipProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 19px;
  padding: 3px 5px 3px 8px;
  gap: 2px;
  border-radius: 15px;
  border: 1px solid
    ${({ hasValue }) => (hasValue ? "transparent" : theme.colors.gray500)};
  background: ${({ hasValue }) =>
    hasValue ? theme.colors.linear_purple : theme.colors.white};
  color: ${({ hasValue }) =>
    hasValue ? theme.colors.white : theme.colors.gray900};
  ${(props) => props.theme.fonts.c1_medium};
  cursor: pointer;
`;
