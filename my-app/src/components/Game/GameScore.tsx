import { Typography } from '@mui/material';
import { POINTS } from '../../utils/Constants';
import { ScoreWrapper } from './styles';
import TextTimer from './TextTimer';

interface GameScoreProps {
  score: number;
  correctAnswersCount: number;
  seconds: number;
  isTimerActive: boolean;
}

const GameScore = ({ score, correctAnswersCount, seconds, isTimerActive }: GameScoreProps) => {
  const pointsId = correctAnswersCount >= POINTS.length ? POINTS.length - 1 : correctAnswersCount;
  const plusScore = POINTS[pointsId];

  return (
    <ScoreWrapper>
      <Typography>
        {score} баллов (+{plusScore})
      </Typography>

      {isTimerActive && <TextTimer seconds={seconds} />}
    </ScoreWrapper>
  );
};

export default GameScore;
