import { Paper, styled } from '@mui/material';
import React from 'react';
import { useEffect, useState } from 'react';
import { GAME_TYPE } from '../../utils/Constants';
import { AudioContext } from '../audiocall/Audiocall';
import GameLife from '../audiocall/GameLife';
import { QuizContext } from '../sprint/Sprint';

interface GameScoreProps {
  correctAnswersCount: number;
  isCorrect: boolean;
  type: GAME_TYPE;
}

type StarProps = {
  clicked?: boolean;
};

const StyledStar = styled('div')(({ clicked }: StarProps) => ({
  width: 'fit-content',
  transition: '0.3s ease-out',
  opacity: 1,

  '&:hover': {
    // transform: scale(2);
    // opacity: 0;
    animation: 'stretch-bounce 0.5s ease-in-out',
  },
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
    <Paper
      elevation={3}
      style={{
        position: 'absolute',
        top: '0',
        left: '0',
        border: '1px solid #5393E1',
        borderRadius: '5px',
        padding: '10px',
      }}
    >
      <p>
        {props.isCorrect
          ? `+${points[id]} очков за правильный ответ`
          : `+${points[0]} очков за правильный ответ`}
      </p>
      {/* : `Неверно!`}</p> */}
      <div>
        {props.type === GAME_TYPE.SPRINT
          ? stars.map((item, idx) => {
              return props.correctAnswersCount > idx ? (
                <StyledStar key={idx}>{item}</StyledStar>
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
      <div>Всего {score} баллов!</div>
    </Paper>
  );
};

export default GameScore;
