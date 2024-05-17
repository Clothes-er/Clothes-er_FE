import { theme } from "@/styles/theme";
import React from "react";
import styled from "styled-components";
import Image from "next/image";

export interface InputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  onClick?: () => void;
  placeholder?: string;
  inputType?: "text";
  errorMsg?: string;
}

const Input: React.FC<InputProps> = (props: InputProps) => {
  const {
    label,
    value,
    onChange,
    onClick,
    placeholder,
    inputType = "text",
    errorMsg,
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
        type="text"
        value={value}
        onChange={handleChange}
        onClick={handleClick}
        placeholder={placeholder}
      />
      {errorMsg && <Error>{errorMsg}</Error>}
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
  padding: 13px 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 15px;
  border: 1px solid
    ${({ errorMsg, theme }) =>
      errorMsg ? theme.colors.red : theme.colors.gray400};
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
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: -30px;
  cursor: pointer;
`;

const Error = styled.div`
  color: ${(props) => props.theme.colors.red};
  ${(props) => props.theme.fonts.c1_regular};
`;
