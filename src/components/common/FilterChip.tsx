import { theme } from "@/styles/theme";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

interface FilterChipProps {
  label: string;
  value?: string;
  onClick?: (value: any) => void;
}

const FilterChip: React.FC<FilterChipProps> = ({ label, value, onClick }) => {
  return (
    <StyledChip hasValue={!!value} onClick={onClick}>
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

export default FilterChip;

interface StyledChipProps {
  hasValue: boolean;
}

const StyledChip = styled.div<StyledChipProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 23px;
  padding: 3px 8px 3px 8px;
  border-radius: 15px;
  border: 1px solid
    ${({ hasValue }) =>
      hasValue ? theme.colors.purple500 : theme.colors.gray400};
  color: ${({ hasValue }) => (hasValue ? theme.colors.purple500 : "#2E2E44")};
  ${(props) => props.theme.fonts.c1_medium};
  cursor: pointer;
  white-space: nowrap;
`;
