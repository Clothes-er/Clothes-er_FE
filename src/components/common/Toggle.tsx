import { theme } from "@/styles/theme";
import styled from "styled-components";
import { css } from "styled-components";

interface ToggleProps {
  isOn: boolean;
  onToggle: (state: boolean) => void;
  disabled?: boolean;
}

const Toggle = (props: ToggleProps) => {
  const { isOn, onToggle, disabled = false } = props;

  const toggleHandler = () => {
    onToggle(!isOn);
  };

  return (
    <>
      <ToggleContainer onClick={toggleHandler} disabled={disabled}>
        <div className={`toggle-circle ${isOn ? null : "toggle--unchecked"}`} />
        <div
          className={`toggle-container ${isOn ? null : "toggle--unchecked"}`}
        />
      </ToggleContainer>
    </>
  );
};

export default Toggle;

const ToggleContainer = styled.div<{
  disabled: boolean;
}>`
  position: relative;
  cursor: pointer;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

  > .toggle-container {
    width: 42px;
    height: 25px;
    border-radius: 49px;
    background-color: ${theme.colors.purple250};
    /* ${({ disabled }) =>
      disabled &&
      css`
        background-color: ${theme.colors.gray200};
      `} */
  }

  > .toggle--unchecked {
    background-color: ${theme.colors.gray300};
    transition: 0.5s;
    /* ${({ disabled }) =>
      disabled &&
      css`
        background-color: ${theme.colors.gray200};
      `} */
  }

  > .toggle-circle {
    position: absolute;
    top: 50%;
    left: 4px;
    transform: translate(0, -50%);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: rgb(255, 254, 255);
    transition: 0.5s;
    /* ${({ disabled }) =>
      disabled &&
      css`
        background-color: ${theme.colors.gray300};
      `} */
  }
  > .toggle--unchecked {
    left: 22px;
    transition: 0.5s;
  }
`;
