import { theme } from "@/styles/theme";
import React, { ReactNode } from "react";
import styled from "styled-components";

interface ModalProps {
  title: string;
  text?: string;
  no?: string;
  yes?: string;
  onClose: () => void;
  onCheck: () => void;
  width?: string;
  height?: string;
  content?: ReactNode;
}
const Modal = (props: ModalProps) => {
  const {
    title,
    text,
    no = "아니요",
    yes = "네",
    onClose,
    onCheck,
    width,
    height,
    content,
  } = props;
  return (
    <>
      <StyledModal width={width} height={height}>
        <Div>
          <Title>{title}</Title>
          {text}
        </Div>
        {content && <div>{content}</div>}
        <Pair>
          <StyledButton className="no" onClick={onClose}>
            {no}
          </StyledButton>
          <StyledButton className="yes" onClick={onCheck}>
            {yes}
          </StyledButton>
        </Pair>
      </StyledModal>
      <Overlay onClick={onClose} />
    </>
  );
};

export default Modal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 100;
`;
const StyledModal = styled.div<{ width?: string; height?: string }>`
  width: ${(props) => props.width || "305px"};
  height: ${(props) => props.height || "auto"};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 35px 33px 18px 33px;
  border-radius: 20px;
  gap: 20px;
  background: ${theme.colors.white};
  box-shadow: 0px 4px 20px 0px rgba(144, 144, 144, 0.25);
  color: ${theme.colors.purple500};
  ${(props) => props.theme.fonts.b3_regular};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 200;
`;

const Div = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
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

const StyledButton = styled.div`
  width: 116px;
  height: 40px;
  border-radius: 10px;
  color: ${theme.colors.gray700};
  ${(props) => props.theme.fonts.h2_bold};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background: ${theme.colors.gray100};
  }

  &.yes {
    color: ${theme.colors.purple300};
    &:hover {
      background: ${theme.colors.purple100};
    }
  }
`;
