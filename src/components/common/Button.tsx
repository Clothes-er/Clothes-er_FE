import { theme } from "@/styles/theme";
import React, { ReactNode } from "react";
import styled from "styled-components";

export type buttonType = "primaryDeep" | "primary" | "primaryLight" | "gray";

type ButtonTypes = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export interface ButtonProps extends ButtonTypes {
  text: ReactNode;
  buttonType?: buttonType;
  size?: "large" | "medium" | "small";
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties & { fontSize?: string };
  disabled?: boolean;
}

const Button = (props: ButtonProps) => {
  const {
    text,
    buttonType = "primary",
    size,
    onClick,
    style,
    disabled,
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
    >
      {text}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button`
  display: flex;
  width: 100%;
  padding: 16px 28px;
  position: relative;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 15px;
  ${(props) => props.theme.fonts.body2_m};
  white-space: nowrap;
  cursor: pointer;
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
    background: ${theme.colors.purple600};
    &:hover {
      background: ${theme.colors.purple900};
    }
    &:active {
      background: ${theme.colors.purple900};
    }
    &:disabled {
      background: ${theme.colors.gray500};
    }
  }
  &.primaryLight {
    color: ${theme.colors.gray900};
    background: ${theme.colors.purple100};
    border: 1.5px solid ${theme.colors.gray400};
    &:hover {
      background: #e8e4ff;
    }
    &:active {
      background: #e8e4ff;
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
    ${(props) => props.theme.fonts.b2_medium};
  }

  &.medium {
    height: 50px;
    padding: 16px 25px;
    ${(props) => props.theme.fonts.b2_medium};
  }

  &.small {
    height: 50px;
    max-width: 79px;
    ${(props) => props.theme.fonts.b2_regular};
  }
`;
