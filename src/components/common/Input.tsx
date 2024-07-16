import { theme } from "@/styles/theme";
import React, { ReactNode } from "react";
import styled from "styled-components";

export interface InputProps {
  label?: string;
  value: any;
  size?: "large" | "medium" | "small";
  onChange: (value: any) => void;
  onClick?: () => void;
  placeholder?: string;
  inputType?: "text" | "password" | "write" | "textarea" | "array";
  errorMsg?: string;
  readOnly?: boolean;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = (props: InputProps) => {
  const {
    label,
    value,
    size = "medium",
    onChange,
    onClick,
    placeholder,
    inputType = "text",
    errorMsg,
    readOnly = false,
    disabled = false,
  } = props;

  // const handleChange = (event: any) => {
  //   onChange(event.target.value);
  // };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (inputType === "array") {
      onChange(inputValue.split(",").map((item) => item.trim()));
    } else {
      onChange(inputValue);
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Container $label={label || ""}>
      {label && <Label>{label}</Label>}
      <StyledInput
        className={size + " " + inputType}
        type={inputType}
        value={value}
        onChange={handleChange}
        onClick={handleClick}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
      />
      {errorMsg && <Error errorMsg={errorMsg}>{errorMsg}</Error>}
    </Container>
  );
};

export default Input;

const Container = styled.div<{ $label: string }>`
  width: 100%;
  display: ${({ $label }) => $label && "flex"};
  flex-direction: ${({ $label }) => $label && "column"};
  justify-content: center;
  align-items: flex-start;
`;

const Label = styled.div`
  color: ${theme.colors.black};
  ${(props) => props.theme.fonts.b2_bold};
  font-size: 15px;
  margin-left: 5px;
  margin-bottom: 7px;
`;

const StyledInput = styled.input<InputProps>`
  width: 100%;
  &.text,
  &.password,
  &.array {
    padding: 12px 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 10px;
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
  }

  &.select {
    cursor: pointer;
    caret-color: transparent;
  }

  &.medium {
    height: 50px;
  }
  &.small {
    height: 44px;
  }

  &.write,
  &.textarea {
    height: 30px;
    padding: 8px 12px;
    border-radius: 5px;
    border: 1px solid ${theme.colors.gray700};
    background: #fff;
    color: ${theme.colors.b100};
    outline: none;
    ${(props) => props.theme.fonts.c1_regular};
    &::placeholder {
      color: ${theme.colors.gray600};
    }
  }
  &:disabled {
    border: none;
    background: ${theme.colors.gray100};
  }
  &:focus {
    border: 1px solid ${theme.colors.purple800};
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
  margin-top: 5px;
`;
