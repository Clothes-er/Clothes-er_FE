import styled from "styled-components";
import Input from "./Input";
import { useState } from "react";
import { theme } from "@/styles/theme";
import Image from "next/image";

interface DropdownProps {
  value: any;
  placeholder: string;
  options: string[];
  size?: "large" | "medium" | "small";
  setValue: (value: any) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  value,
  placeholder,
  options,
  size,
  setValue,
}) => {
  const [dropdown, setDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setDropdown(false);
    setValue(option);
    console.log(option);
  };

  return (
    <Box>
      <DropInput
        value={selectedOption || value}
        size={size}
        placeholder={placeholder}
        onChange={() => {}}
        readOnly
      />
      <MoreIcon
        src="/assets/icons/ic_dropdown_more.svg"
        width={13}
        height={12}
        alt="more"
        onClick={handleDropdown}
      />
      {dropdown && (
        <DropBox>
          {options.map((option, index) => (
            <Option key={index} onClick={() => handleOptionSelect(option)}>
              {option}
            </Option>
          ))}
        </DropBox>
      )}
    </Box>
  );
};

export default Dropdown;

const Box = styled.div`
  width: 100%;
  position: relative;
  height: 44px;
`;

const DropInput = styled(Input)`
  position: absolute;
  top: 0;
  left: 0;
`;

const MoreIcon = styled(Image)`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translate(-50%, 0);
  cursor: pointer;
`;

const DropBox = styled.div`
  width: 100%;
  position: absolute;
  top: 50px;
  left: 0;
  border-radius: 15px;
  border: 1px solid ${theme.colors.gray400};
  background-color: ${theme.colors.white};
  overflow: hidden;
`;

const Option = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background-color: ${theme.colors.gray100};
  }
`;
