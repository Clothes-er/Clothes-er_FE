import { theme } from "@/styles/theme";
import React from "react";
import styled from "styled-components";
import Image from "next/image";

export interface InputProps {
  label?: string;
  value: string;
  size?: "large" | "medium" | "small";
  onChange: (value: string) => void;
  onClick?: () => void;
  placeholder?: string;
  inputType?: "text" | "password";
  errorMsg?: string;
  readOnly?: boolean;
}

const Input: React.FC<InputProps> = (props: InputProps) => {
  const {
    label,
    value,
    size,
    onChange,
    onClick,
    placeholder,
    inputType = "text",
    errorMsg,
    readOnly = false,
  } = props;

  const handleChange = (event: any) => {
    onChange(event.target.value);
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Container>
      <Label>{label}</Label>
      <StyledInput
        className={size}
        type={inputType}
        value={value}
        onChange={handleChange}
        onClick={handleClick}
        placeholder={placeholder}
        readOnly={readOnly}
      />
      <Error errorMsg={errorMsg}>{errorMsg}</Error>
    </Container>
  );
};

export default Input;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 5px;
`;

const Label = styled.div`
  color: ${theme.colors.black};
  ${(props) => props.theme.fonts.b2_bold};
`;

const StyledInput = styled.input<InputProps>`
  width: 100%;
  height: 44px;
  padding: 12px 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 15px;
  border: 1px solid
    ${({ errorMsg, theme }) =>
      errorMsg && errorMsg.length > 0
        ? theme.colors.red
        : theme.colors.gray400};
  background: ${theme.colors.white};
  color: ${theme.colors.b200};
  outline: none;
  ${(props) => props.theme.fonts.b2_regular};
  &::placeholder {
    color: ${theme.colors.gray900};
    ${(props) => props.theme.fonts.b2_regular};
  }

  &.select {
    cursor: pointer;
    caret-color: transparent;
  }

  &.medium {
    height: 50px;
  }
`;

interface StyledInputProps {
  errorMsg?: string;
}

const Error = styled.div<StyledInputProps>`
  height: 16px;
  padding-left: 10px;
  color: ${(props) => props.theme.colors.red};
  ${(props) => props.theme.fonts.c1_regular};
  opacity: ${(props) => (props.errorMsg ? 1 : 0)};
`;
