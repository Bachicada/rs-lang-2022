import { Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSprintContext } from '../../../store/hooks';
import { SprintActionTypes } from '../../../types/sprintTypes';
import { GAME_TYPE } from '../../../utils/Constants';
import { AudioContext } from '../../audiocall/Audiocall';
import GameLife from '../../audiocall/GameLife';
import { ScoreWrapper, StarsWrapper, StyledStar } from './styles';
import TextTimer from './TextTimer';

interface GameScoreProps {
  correctAnswersCount: number;
  isCorrect: boolean;
  type: GAME_TYPE;
}

const points = [10, 20, 40, 80];
const stars = ['⭐', '⭐', '⭐', '⭐'];

const GameScore = ({ correctAnswersCount, isCorrect, type }: GameScoreProps) => {
  const [sprintContext, dispatch] = useSprintContext();

  // const [audioState] = React.useContext(AudioContext);
  const [score, setScore] = useState(0);

  const correctCount = correctAnswersCount !== 0 ? correctAnswersCount - 1 : 0;
  const id = correctAnswersCount >= points.length ? points.length - 1 : correctCount;

  useEffect(() => {
    if (isCorrect) {
      const newScore = score + points[id];

      setScore(newScore);
      dispatch({ type: SprintActionTypes.SET_RECORD, payload: newScore });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, correctCount, id, isCorrect]);

  const plusScore = isCorrect ? points[id + 1] || points.at(-1) : points[0];

  return (
    <Stack sx={{ width: '100%' }}>
      <ScoreWrapper>
        <Typography>
          {score} баллов (+{plusScore})
        </Typography>

        <TextTimer quizState={sprintContext} dispatch={dispatch} />
      </ScoreWrapper>

      <StarsWrapper>
        {type === GAME_TYPE.SPRINT
          ? stars.map((item, idx) => {
              const isCorrect = correctAnswersCount > idx;

              return (
                <StyledStar key={idx} isCorrect={isCorrect}>
                  {item}
                </StyledStar>
              );
            })
          : null}

        {/* {props.type === GAME_TYPE.AUDIOCALL ? (
          <GameLife count={audioState.currentLifeIndex} />
        ) : null} */}
      </StarsWrapper>
    </Stack>
  );
};

export default GameScore;
