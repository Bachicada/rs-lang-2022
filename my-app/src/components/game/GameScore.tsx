import { Stack, styled } from '@mui/material';
import React from 'react';
import { useEffect, useState } from 'react';
import { GAME_TYPE } from '../../utils/Constants';
import { AudioContext } from '../audiocall/Audiocall';
import GameLife from '../audiocall/GameLife';
import { QuizContext } from '../sprint/Sprint';
import Timer from './Timer';

interface GameScoreProps {
  correctAnswersCount: number;
  isCorrect: boolean;
  type: GAME_TYPE;
}

type StarProps = {
  correct?: boolean;
};

const StyledStar = styled('div')(({ correct }: StarProps) => ({
  width: 'fit-content',
  opacity: 1,
  animation: `${correct ? 'stretch-bounce 0.5s ease-in-out' : null}`,
  transition: '0.3s ease-out',
  fontSize: '2rem',
}));

const GameScore = (props: GameScoreProps) => {
  const [quizState, dispatch] = React.useContext(QuizContext);
  const [audioState] = React.useContext(AudioContext);
  const [score, setScore] = useState(0);
  const points = [10, 20, 40, 80];
  const stars = ['⭐', '⭐', '⭐', '⭐'];
  const id =
    props.correctAnswersCount > points.length - 1 ? points.length - 1 : props.correctAnswersCount;

  useEffect(() => {
    if (quizState.currentQuestionIndex && props.isCorrect) {
      setScore((prev) => prev + points[id - 1]);
      dispatch({ type: 'SET_RECORD', payload: score });
    }
  }, [quizState.currentQuestionIndex]);
  return (
    <Stack>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {props.type === GAME_TYPE.SPRINT
          ? stars.map((item, idx) => {
              return props.correctAnswersCount > idx ? (
                <StyledStar key={idx} correct={true}>
                  {item}
                </StyledStar>
              ) : (
                <StyledStar key={idx} style={{ filter: 'grayscale(1)' }}>
                  {item}
                </StyledStar>
              );
            })
          : null}
        {props.type === GAME_TYPE.AUDIOCALL ? (
          <GameLife count={audioState.currentLifeIndex} />
        ) : null}
      </div>
      <div>
        <div>
          <p>
            {props.isCorrect
              ? `+${points[id]} очков за правильный ответ`
              : `+${points[0]} очков за правильный ответ`}
          </p>
          <p>Всего {score} баллов!</p>
        </div>

        <Timer time={quizState.seconds} max={60} />
      </div>
    </Stack>
  );
};

export default GameScore;
