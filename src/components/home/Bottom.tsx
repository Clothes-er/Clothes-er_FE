import { theme } from "@/styles/theme";
import styled from "styled-components";

const Bottom = () => {
  return (
    <StyledBottom>
      <div>
        <Price>
          3,000원~
          <Days>3days</Days>
        </Price>
        <MorePrice>가격표 보기</MorePrice>
      </div>
      <Chat>문의하기</Chat>
    </StyledBottom>
  );
};

export default Bottom;

const StyledBottom = styled.div`
  width: 100%;
  height: 82px;
  padding: 24px 26px;
  border-radius: 20px 20px 0px 0px;
  background: ${theme.colors.white};
  box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.06) inset;
  position: sticky;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  ${(props) => props.theme.fonts.h2_medium};
`;

const Days = styled.span`
  ${(props) => props.theme.fonts.b3_regular};
`;

const MorePrice = styled.div`
  color: ${theme.colors.purple400};
  ${(props) => props.theme.fonts.c1_regular};
  text-decoration: underline;
  margin-top: 6px;
`;
const Chat = styled.div`
  width: 137px;
  height: 40px;
  border-radius: 15px;
  background: ${theme.colors.purple400};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.white};
  ${(props) => props.theme.fonts.b2_regular};
  cursor: pointer;
`;
