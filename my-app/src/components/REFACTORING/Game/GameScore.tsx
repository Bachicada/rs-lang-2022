import { Typography } from '@mui/material';
import { POINTS } from '../../../utils/Constants';
import { ScoreWrapper } from './styles';
import TextTimer from './TextTimer';

interface GameScoreProps {
  score: number;
  correctAnswersCount: number;
  seconds: number;
  isTimerActive: boolean;
  onTimeTick: () => void;
  onTimeOver: () => void;
}

const GameScore = ({
  score,
  correctAnswersCount,
  seconds,
  isTimerActive,
  onTimeTick,
  onTimeOver,
}: GameScoreProps) => {
  const pointsId = correctAnswersCount > POINTS.length ? POINTS.length - 1 : correctAnswersCount;
  const plusScore = POINTS[pointsId];

  return (
    <ScoreWrapper>
      <Typography>
        {score} баллов (+{plusScore})
      </Typography>

      <TextTimer
        seconds={seconds}
        isTimerActive={isTimerActive}
        onTimeTick={onTimeTick}
        onTimeOver={onTimeOver}
      />
    </ScoreWrapper>
  );
};

export default GameScore;
