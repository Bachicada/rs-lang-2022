import { Stack, Typography } from '@mui/material';
import React from 'react';
import { useEffect, useState } from 'react';
import { GAME_TYPE } from '../../utils/Constants';
import { AudioContext } from '../audiocall/Audiocall';
import GameLife from '../audiocall/GameLife';
import { ScoreWrapper, StarsWrapper, StyledStar } from '../REFACTORING/Game/styles';
import { QuizContext } from '../sprint/Sprint';
import TextTimer from './TextTimer';

interface GameScoreProps {
  correctAnswersCount: number;
  isCorrect: boolean;
  type: GAME_TYPE;
}

const points = [10, 20, 40, 80];
const stars = ['⭐', '⭐', '⭐', '⭐'];

const GameScore = (props: GameScoreProps) => {
  const [quizState, dispatch] = React.useContext(QuizContext);
  const [audioState] = React.useContext(AudioContext);

  const [score, setScore] = useState(0);

  const id =
    props.correctAnswersCount > points.length - 1 ? points.length - 1 : props.correctAnswersCount;

  useEffect(() => {
    if (quizState.currentQuestionIndex && props.isCorrect) {
      setScore((prev) => prev + points[id - 1]);
      dispatch({ type: 'SET_RECORD', payload: score });
    }
  }, [quizState.currentQuestionIndex]);

  const plusScore = props.isCorrect ? points[id] : points[0];

  return (
    <Stack sx={{ width: '100%' }}>
      <ScoreWrapper>
        <Typography>
          {score} баллов (+{plusScore})
        </Typography>

        <TextTimer quizState={quizState} dispatch={dispatch} />
      </ScoreWrapper>

      <StarsWrapper>
        {props.type === GAME_TYPE.SPRINT
          ? stars.map((item, idx) => {
              const isCorrect = props.correctAnswersCount > idx;

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
