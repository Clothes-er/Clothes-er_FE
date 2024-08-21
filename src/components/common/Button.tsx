import { blink } from "@/styles/Animation";
import { theme } from "@/styles/theme";
import React, { ReactNode } from "react";
import styled, { css, keyframes } from "styled-components";

export type buttonType = "primaryDeep" | "primary" | "primaryLight" | "gray";

type ButtonTypes = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export interface ButtonProps extends ButtonTypes {
  text: ReactNode;
  buttonType?: buttonType;
  size?: "large" | "medium" | "small";
  width?: string;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties & { fontSize?: string };
  disabled?: boolean;
  blink?: boolean;
}

const Button = (props: ButtonProps) => {
  const {
    text,
    buttonType = "primary",
    size,
    width,
    onClick,
    style,
    disabled,
    blink = false,
  } = props;

  let buttonClassName = buttonType;
  if (buttonType === "primary") {
    buttonClassName += " primary";
  } else if (buttonType === "primaryLight") {
    buttonClassName += " primaryLight";
  }

  if (size === "large") {
    buttonClassName += " large";
  } else if (size === "medium") {
    buttonClassName += " medium";
  } else if (size === "small") {
    buttonClassName += " small";
  }

  return (
    <StyledButton
      className={buttonClassName}
      style={style}
      onClick={onClick}
      disabled={disabled}
      $isBlink={blink}
      $width={width}
    >
      {text}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<{
  $isBlink: boolean;
  $width: string | undefined;
}>`
  display: flex;
  width: ${({ $width }) => ($width ? $width : "100%")};
  padding: 16px 28px;
  position: relative;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  ${(props) => props.theme.fonts.b2_regular};
  white-space: nowrap;
  gap: 10px;
  transition: color 200ms, background-color 200ms;

  /* buttonType */
  &.primaryDeep {
    color: ${theme.colors.white};
    background: ${theme.colors.purple800};
    &:hover {
      background: ${theme.colors.purple700};
    }
    &:active {
      background: ${theme.colors.purple700};
    }
    &:disabled {
      background: ${theme.colors.gray500};
    }
  }
  &.primary {
    color: ${theme.colors.white};
    background: ${theme.colors.purple500};
    &:hover {
      background: ${theme.colors.purple900};
    }
    &:active {
      background: ${theme.colors.purple900};
    }
    &:disabled {
      background: ${theme.colors.gray700};
    }
  }
  &.primaryLight {
    border-radius: 5px;
    border: 1.5px solid ${theme.colors.purple800};
    color: ${theme.colors.purple800};
    background: ${theme.colors.purple50};

    &:hover {
      background: ${theme.colors.purple150};
    }
    &:active {
      background: ${theme.colors.purple150};
    }
    &:disabled {
      border: 1.5px solid ${theme.colors.gray800};
      color: ${theme.colors.b100};
      background: ${theme.colors.gray100};
    }
  }
  &.gray {
    color: ${theme.colors.white};
    background: ${theme.colors.gray700};
    &:hover {
      background: ${theme.colors.gray800};
    }
    &:active {
      background: ${theme.colors.gray800};
    }
  }

  /* size */
  &.large {
    height: 56px;
    padding: 18px 82px;
    ${(props) => props.theme.fonts.b2_bold};
  }

  &.medium {
    height: 50px;
    padding: 16px 25px;
    ${(props) => props.theme.fonts.b2_medium};
  }

  &.small {
    height: 46px;
    ${(props) => props.theme.fonts.b2_regular};
  }

  /* 깜빡거리는 효과 */
  ${({ $isBlink }) =>
    $isBlink &&
    css`
      animation: ${blink} 1.5s infinite;
    `}
`;
