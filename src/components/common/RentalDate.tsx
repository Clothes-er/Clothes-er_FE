import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { theme } from "@/styles/theme";

interface RentalDateProps {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
}

const RentalDate: React.FC<RentalDateProps> = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) => {
  return (
    <RentalDateWrapper>
      <Label>대여 시작일</Label>
      <StyledDatePicker
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        dateFormat="yyyy/MM/dd"
        placeholderText="날짜를 선택하세요"
      />
      <Label>반납 예정일</Label>
      <StyledDatePicker
        selected={endDate}
        onChange={(date: Date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        dateFormat="yyyy/MM/dd"
        placeholderText="날짜를 선택하세요"
      />
    </RentalDateWrapper>
  );
};

export default RentalDate;

const RentalDateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 20px;
`;

const Label = styled.div`
  color: ${theme.colors.black};
  ${(props) => props.theme.fonts.b3_medium};
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  height: 44px;
  padding: 12px 18px;
  border-radius: 15px;
  border: 1px solid ${theme.colors.gray400};
  background: ${theme.colors.white};
  color: ${theme.colors.b200};
  outline: none;
  ${(props) => props.theme.fonts.b2_regular};
  &::placeholder {
    color: ${theme.colors.gray900};
    ${(props) => props.theme.fonts.b2_regular};
  }
  &:disabled {
    background: ${theme.colors.gray100};
  }
  &:hover {
    border-color: ${theme.colors.gray600};
  }
  &:focus {
    border-color: ${theme.colors.purple300};
  }
`;
