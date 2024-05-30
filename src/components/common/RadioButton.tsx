import { theme } from "@/styles/theme";
import { useState } from "react";
import styled from "styled-components";

interface ChoiceProps {
  options: string[];
  onChange: (selectedOption: string) => void;
}
const RadioButton: React.FC<ChoiceProps> = ({ options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleClick = (option: string) => {
    if (option !== selectedOption) {
      setSelectedOption(option);
      onChange(option);
    }
  };

  return (
    <ChoiceContainer>
      {options.map((option, index) => (
        <ChoiceInput
          key={index}
          onClick={() => handleClick(option)}
          isSelected={option === selectedOption}
        >
          {option}
        </ChoiceInput>
      ))}
    </ChoiceContainer>
  );
};

export default RadioButton;

const ChoiceContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const ChoiceInput = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  /* width: 112px; */
  width: 100%;
  height: 50px;
  border-radius: 15px;
  border: 1px solid
    ${({ isSelected }) =>
      isSelected ? theme.colors.purple800 : theme.colors.gray400};
  background: ${({ isSelected }) =>
    isSelected ? theme.colors.purple150 : "none"};
  color: ${theme.colors.black};
  ${(props) => props.theme.fonts.b2_regular};
`;
