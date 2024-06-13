import { theme } from "@/styles/theme";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

interface FilterChipProps {
  label: string;
  value?: string;
  selected: boolean;
  onClick?: (value: any) => void;
}

const FilterChip: React.FC<FilterChipProps> = ({
  label,
  value,
  selected,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) onClick(value);
  };

  return (
    <StyledChip selected={selected} hasValue={!!value} onClick={handleClick}>
      {value || label}
      {/* {value ? (
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
      )} */}
    </StyledChip>
  );
};

export default FilterChip;

interface StyledChipProps {
  selected: boolean;
  hasValue: boolean;
}

const StyledChip = styled.div<StyledChipProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 23px;
  padding: 3px 8px;
  text-align: center;
  border-radius: 15px;
  border: 1px solid
    ${({ selected }) =>
      selected ? theme.colors.purple500 : theme.colors.gray400};
  color: ${({ selected }) => (selected ? theme.colors.purple500 : "#2E2E44")};
  ${(props) => props.theme.fonts.c1_medium};
  cursor: pointer;
  white-space: nowrap;
`;

/* border: 1px solid
  ${({ hasValue }) =>
  hasValue ? theme.colors.purple500 : theme.colors.gray400};
color: ${({ hasValue }) =>
  hasValue ? theme.colors.purple500 : "#2E2E44"}; */
