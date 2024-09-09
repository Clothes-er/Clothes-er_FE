import { theme } from "@/styles/theme";
import React from "react";
import styled from "styled-components";

interface ScoreBarProps {
  recentScore: number;
  nickname?: string;
}

const ScoreBar: React.FC<ScoreBarProps> = (props) => {
  const { recentScore, nickname } = props;

  return (
    <Bar>
      <Dots>
        {[0, 4, 8, 12, 16, 20].map((score, index) => (
          <Column key={index}>
            <WhiteDot />
            <Score>{score}</Score>
          </Column>
        ))}
      </Dots>
      <Location $recentScore={recentScore}>{nickname || "나"}의 옷장</Location>
    </Bar>
  );
};

export default ScoreBar;

const Bar = styled.div`
  width: 100%;
  height: 14px;
  padding: 2px;
  border-radius: 30px;
  background: linear-gradient(
    270deg,
    #796ef2 0%,
    #8677e1 18.5%,
    #a29aff 38.5%,
    #d8d1ff 59%,
    #e8e4ff 77%,
    #f5f3ff 95%
  );
  background-color: red;
  position: relative;
`;

const Dots = styled.div`
  width: calc(100% - 4px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 3px;
  left: 50%;
  transform: translateX(-50%);
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const WhiteDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 10px;
  background: ${theme.colors.white};
`;

const Score = styled.div`
  color: ${theme.colors.b100};
  ${(props) => props.theme.fonts.c3_medium};
`;

const Location = styled.div<{ $recentScore: number }>`
  height: 20px;
  padding: 4px 8px;
  border-radius: 10px;
  background: ${theme.colors.purple100};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: ${theme.colors.purple500};
  ${(props) => props.theme.fonts.c3_medium};
  position: absolute;
  top: -25px;
  left: calc(${({ $recentScore }) => (100 * $recentScore) / 20}% - 28px);
  white-space: nowrap;

  &:after {
    content: "";
    position: absolute;
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-width: 8px 3px 0;
    border-style: solid;
    border-color: ${theme.colors.purple100} transparent transparent transparent;
  }
`;
