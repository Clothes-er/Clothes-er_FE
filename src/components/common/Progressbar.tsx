import { theme } from "@/styles/theme";
import styled from "styled-components";

export interface ProgressivebarProps {
  step: number;
}

const Progressbar = ({ step }: ProgressivebarProps) => {
  return (
    <Bar>
      <Inner step={step} />
    </Bar>
  );
};

export default Progressbar;

const Bar = styled.div`
  width: 100%;
  height: 5px;
  background: ${theme.colors.gray400};
  position: relative;
  overflow-x: hidden;
  margin-bottom: 41px;
`;

const Inner = styled.div<ProgressivebarProps>`
  width: calc(33.3 * ${(props) => props.step}%);
  height: 5px;
  background: ${theme.colors.purple500};
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
`;
