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
  labelFontSize?: string;
  color?: "purple" | "gray" | "black";
}

const Checkbox = (props: CheckBoxProps) => {
  const {
    value,
    label,
    text,
    checked = false,
    onChange,
    checkboxType = "checkbox",
    essential,
    labelFontSize = "b3_medium",
    color = "black",
  } = props;

  let checkboxClassName = checkboxType;
  if (color) {
    checkboxClassName += " " + color;
  }

  return (
    <CheckBoxLayout className={checkboxClassName} $checked={checked}>
      <CheckboxContainer
        className={checkboxClassName}
        $essential={essential ? true : false}
        $labelFontSize={labelFontSize}
      >
        <CheckboxInput
          value={value}
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />
        {text && <span className={color}>{text}</span>}
        <div>{label}</div>
      </CheckboxContainer>
      {checkboxType === "checkArrow" && (
        // <Image
        //   src="/assets/icons/ic_chevron_right.svg"
        //   alt="arrow"
        //   width={20}
        //   height={20}
        // />
        <More>보기</More>
      )}
    </CheckBoxLayout>
  );
};

export default Checkbox;

const CheckBoxLayout = styled.div<{ $checked: boolean }>`
  display: flex;
  align-items: center;

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
    border-radius: 10px;
    img {
      display: none;
    }
    border: ${(props) =>
      props.$checked
        ? `1px solid ${theme.colors.primary300}`
        : `1px solid transparent`};
  }
`;

const CheckboxContainer = styled.label<{
  $essential: boolean;
  $labelFontSize: string;
}>`
  display: flex;
  align-items: center;
  flex-grow: 1;
  color: ${theme.colors.b700};
  cursor: pointer;

  div {
    ${({ theme, $labelFontSize }) =>
      $labelFontSize &&
      theme.fonts[$labelFontSize] &&
      `
        ${theme.fonts[$labelFontSize]};
      `}
  }

  span {
    display: flex;
    align-items: center;
    margin-right: 10px;
    ${({ theme }) => theme.fonts.c1_medium};
    color: ${(props) =>
      props.$essential ? theme.colors.primary500 : theme.colors.b100};

    /* color */
    &.purple {
      color: ${theme.colors.purple500};
    }
    &.gray {
      color: ${theme.colors.b400};
    }
    &.black {
      color: ${theme.colors.black};
    }
  }
`;

const CheckboxInput = styled.input<CheckBoxProps>`
  appearance: none;
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid ${theme.colors.purple100};

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

const More = styled.div`
  color: ${theme.colors.gray800};
  ${({ theme }) => theme.fonts.c1_medium};
`;
