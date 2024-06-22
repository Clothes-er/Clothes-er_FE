import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { theme } from "@/styles/theme";
import Image from "next/image";

type dropdownType = "single" | "multi";
interface DropdownProps {
  value: any;
  dropdownType: dropdownType;
  placeholder: string;
  options: string[];
  size?: "large" | "medium" | "small";
  setValue: (value: any) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  value,
  dropdownType = "single",
  placeholder,
  options,
  size,
  setValue,
}) => {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  /* 외부영역 클릭시 dropdown 닫힘 */
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdown(false);
    }
  };

  useEffect(() => {
    if (dropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdown]);

  return (
    <Box className={size} ref={dropdownRef}>
      <DropdownButton
        className={size}
        errorMsg={""}
        onClick={handleDropdown}
        hasValue={dropdownType === "multi" ? value.length > 0 : !!value}
      >
        {dropdownType === "multi"
          ? value.length > 0
            ? value.join(", ")
            : placeholder
          : value || placeholder}
      </DropdownButton>
      <MoreIcon
        src="/assets/icons/ic_dropdown_more.svg"
        width={13}
        height={12}
        alt="more"
        onClick={handleDropdown}
      />
      {dropdown && (
        <DropdownWrapper>
          <DropBox>
            {options.map((option, index) => (
              <Option key={index} onClick={() => setValue(option)}>
                {option}
              </Option>
            ))}
          </DropBox>
        </DropdownWrapper>
      )}
    </Box>
  );
};

export default Dropdown;

const Box = styled.div`
  width: 100%;
  position: relative;
  height: 44px;
  &.medium {
    height: 50px;
  }
`;

const DropdownButton = styled.button<{ errorMsg: string; hasValue: boolean }>`
  width: 100%;
  height: 44px;
  padding: 12px 18px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 15px;
  border: 1px solid
    ${({ errorMsg, theme }) =>
      errorMsg && errorMsg.length > 0
        ? theme.colors.red
        : theme.colors.gray400};
  background: ${theme.colors.white};
  color: ${({ hasValue }) =>
    hasValue ? theme.colors.b200 : theme.colors.gray900};
  outline: none;
  ${(props) => props.theme.fonts.b2_regular};

  &::placeholder {
    color: ${theme.colors.gray900};
    ${(props) => props.theme.fonts.b2_regular};
  }

  &.medium {
    height: 50px;
  }
`;

const MoreIcon = styled(Image)`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-40%);
  cursor: pointer;
`;

const DropdownWrapper = styled.div`
  width: 100%;
  max-height: 180px;
  border-radius: 15px;
  border: 1px solid ${theme.colors.gray400};
  background-color: ${theme.colors.white};
  overflow: hidden;
`;

const DropBox = styled.div`
  width: 100%;
  max-height: 180px;
  overflow-y: auto;
  background-color: ${theme.colors.white};
`;

const Option = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background-color: ${theme.colors.gray100};
  }
`;
