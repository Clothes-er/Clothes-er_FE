import { theme } from "@/styles/theme";
import React from "react";
import styled from "styled-components";
import Button from "./Button";

interface ModalProps {
  title: string;
  text?: string;
  no?: string;
  yes?: string;
}
const Modal = (props: ModalProps) => {
  const { title, text, no = "아니요", yes = "네" } = props;
  return (
    <StyledModal>
      <Title>{title}</Title>
      {text}
      <Pair>
        <Button text={no} />
        <Button text={yes} />
      </Pair>
    </StyledModal>
  );
};

export default Modal;

const StyledModal = styled.div`
  width: 305px;
  height: 224px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 35px 33px;
  border-radius: 20px;
  background: ${theme.colors.white};
  box-shadow: 0px 4px 20px 0px rgba(144, 144, 144, 0.25);
  color: ${theme.colors.purple500};
  ${(props) => props.theme.fonts.b3_regular};
`;

const Title = styled.div`
  color: ${theme.colors.black};
  ${(props) => props.theme.fonts.h2_bold};
`;

const Pair = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 10px;
`;
