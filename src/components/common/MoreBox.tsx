import { theme } from "@/styles/theme";
import React from "react";
import styled from "styled-components";

type moreBoxType = "me" | "other";

interface MoreBoxProps {
  type: moreBoxType;
  modifyOnClick?: () => void;
  deleteOnClick?: () => void;
  reportOnClick?: () => void;
}

const MoreBox: React.FC<MoreBoxProps> = ({
  type,
  modifyOnClick,
  deleteOnClick,
  reportOnClick,
}) => {
  return (
    <Box $type={type}>
      {type === "me" ? (
        <>
          <Element $red={false} onClick={modifyOnClick}>
            수정하기
          </Element>
          <Divider />
          <Element $red={true} onClick={deleteOnClick}>
            삭제하기
          </Element>
        </>
      ) : (
        <Element $red={false} onClick={reportOnClick}>
          신고하기
        </Element>
      )}
    </Box>
  );
};

export default MoreBox;

const Box = styled.div<{ $type: moreBoxType }>`
  width: 100px;
  height: ${({ $type }) => ($type === "me" ? "76px" : "38px")};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
