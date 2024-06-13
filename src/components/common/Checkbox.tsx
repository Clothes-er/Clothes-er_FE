import { theme } from "@/styles/theme";
import styled from "styled-components";
import Image from "next/image";

export type checkboxType = "checkbox" | "checkBtn" | "checkArrow";

export interface CheckBoxProps {
  value?: boolean;
  label?: string;
  text?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checkboxType?: string;
  essential?: boolean;
  color?: "purple" | "gray" | "black";
}

const Checkbox = (props: CheckBoxProps) => {
  const {
    value,
    label,
    text,
    checked,
    onChange,
    checkboxType = "checkbox",
    essential,
    color = "black",
  } = props;

  let checkboxClassName = checkboxType;
  if (color) {
    checkboxClassName += " " + color;
  }

  return (
    <CheckBoxLayout className={checkboxClassName} checked={checked}>
      <CheckboxContainer
        className={checkboxClassName}
        essential={essential ? true : false}
        checked={checked}
      >
        <CheckboxInput
          value={value}
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />
        {label}
        <span>{text}</span>
      </CheckboxContainer>
      {checkboxType === "checkArrow" && (
        <Image
          src="/assets/icons/ic_chevron_right.svg"
          alt="arrow"
          width={20}
          height={20}
        />
      )}
    </CheckBoxLayout>
  );
};

export default Checkbox;

const CheckBoxLayout = styled.div<CheckBoxProps>`
  &.checkArrow {
    width: 100%;
    display: flex;
    align-items: center;
    user-select: none;
    padding: 0 12px;
    cursor: pointer;
  }

  &.checkBtn {
    width: 100%;
    padding: 15px 12px;
    background-color: rgba(178, 166, 255, 0.23);
    border-radius: 10px;
    img {
      display: none;
    }
    border: ${(props) =>
      props.checked
        ? `1px solid ${theme.colors.primary300}`
        : `1px solid transparent`};
  }
`;

const CheckboxContainer = styled.label<CheckBoxProps>`
  display: flex;
  align-items: center;
  flex-grow: 1;
  cursor: pointer;

  span {
    margin-left: 8px;
    ${({ theme }) => theme.fonts.caption1_m};
    color: ${(props) =>
      props.essential ? theme.colors.primary500 : theme.colors.b100};
    /* color */
    &.purple {
      color: ${theme.colors.purple300};
      ${({ theme }) => theme.fonts.b3_medium};
    }
    &.gray {
      color: ${(props) =>
        props.checked ? `${theme.colors.purple500}` : `${theme.colors.black}`};
      ${({ theme }) => theme.fonts.b2_medium};
    }
    &.black {
      color: ${theme.colors.basic};
      ${({ theme }) => theme.fonts.b2_bold};
    }
  }
`;

const CheckboxInput = styled.input<CheckBoxProps>`
  appearance: none;
  width: 1.3rem;
  height: 1.3rem;
  border: 2px solid ${theme.colors.purple100};
  background-color: ${theme.colors.purple100};

  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiByeD0iNCIgZmlsbD0iI0Q4RDFGRiIvPgo8cGF0aCBkPSJNMTQgN0w4LjUgMTIuNUw2IDEwIiBzdHJva2U9IiNBMjlBRkYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=");
  background-size: 100% 100%;
  background-position: 50%;
  border-radius: 0.35rem;
  margin-right: 16px;

  &:hover {
    box-shadow: 0 0 0 max(2px, 0.3em) ${theme.colors.purple100};
    cursor: pointer;
  }

  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMCAyMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeT0iMC41IiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHJ4PSI0IiBmaWxsPSIjNzk2RUYyIi8+CjxwYXRoIGQ9Ik0xNCA3LjVMOC41IDEzTDYgMTAuNSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: ${theme.colors.primary600};
  }
`;
