import { theme } from "@/styles/theme";
import React from "react";
import styled from "styled-components";

interface MoreBoxProps {
  firstOnClick: () => void;
  secondOnClick: () => void;
}

const MoreBox: React.FC<MoreBoxProps> = ({ firstOnClick, secondOnClick }) => {
  return (
    <Box>
      <Element $red={false} onClick={firstOnClick}>
        수정하기
      </Element>
      <Divider />
      <Element $red={true} onClick={secondOnClick}>
        삭제하기
      </Element>
    </Box>
  );
};

export default MoreBox;

const Box = styled.div`
  width: 100px;
  height: 76px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.14);
  background: ${theme.colors.white};
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.08);
  position: absolute;
  top: 25px;
  right: 20px;
  z-index: 100;
`;

const Element = styled.button<{ $red: boolean }>`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ $red, theme }) =>
    $red ? theme.colors.delete : theme.colors.b100};
  ${(props) => props.theme.fonts.b3_medium};
`;

const Divider = styled.div`
  width: 100%;
  height: 0.5px;
  background: rgba(0, 0, 0, 0.14);
`;
