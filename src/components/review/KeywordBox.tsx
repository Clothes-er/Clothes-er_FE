import { theme } from "@/styles/theme";
import React from "react";
import styled from "styled-components";
import { KeywordProps } from "./ReviewPage";

const KeywordBox: React.FC<KeywordProps> = ({ keyword, count }) => {
  return (
    <Box>
      {keyword}
      <Count>{count}</Count>
    </Box>
  );
};

export default KeywordBox;

const Box = styled.div`
  height: 29px;
  padding: 5px 14px;
  border-radius: 15px;
  background: ${theme.colors.gray100};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  ${(props) => props.theme.fonts.b2_regular};
  white-space: nowrap;
`;

const Count = styled.div`
  color: ${theme.colors.purple500};
`;
