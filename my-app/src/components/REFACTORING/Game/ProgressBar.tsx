import { styled } from '@mui/material';
import React from 'react';

type Props = {
  correctAnswersCount: number;
  isCorrect: boolean;
};

type ProgressProps = {
  percent: number;
};

const ProgressBarWrapper = styled('div')`
  height: 15px;
  width: 100%;
  border-radius: 20px;
  border: 1px solid;
`;

const Progress = styled('div')<ProgressProps>(
  ({ percent }) => `
  width: ${percent}%;
  height: 100%;
  border-radius: 20px;
  background: linear-gradient(to right, #faa5a7 0%, #467dfb 100%, white 0%);
  transition: .3s;
`
);

const ProgressBar = ({ correctAnswersCount, isCorrect }: Props) => {
  const percent = !isCorrect ? 0 : correctAnswersCount * 25;

  return (
    <ProgressBarWrapper>
      <Progress percent={percent} />
    </ProgressBarWrapper>
  );
};

export default ProgressBar;
