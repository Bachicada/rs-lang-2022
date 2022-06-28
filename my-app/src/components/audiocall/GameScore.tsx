import React from 'react';
import { useEffect, useState } from 'react';
import { useAudiocallContext } from '../../store/hooks';
import { AudiocallActionTypes } from '../../types/audiocallTypes';

interface GameScoreProps {
  correctAnswersCount: number;
  isCorrect: boolean;
}

const GameScore = (props: GameScoreProps) => {
  const [quizState, dispatch] = useAudiocallContext();
  const [score, setScore] = useState(0);
  const points = [10, 20, 40, 80];
  const id =
    props.correctAnswersCount > points.length - 1 ? points.length - 1 : props.correctAnswersCount;

  useEffect(() => {
    if (quizState.currentQuestionIndex && props.isCorrect) {
      setScore((prev) => prev + points[id - 1]);
      dispatch({ type: AudiocallActionTypes.SET_RECORD, payload: score });
    }
  }, [quizState.currentQuestionIndex]);
  return (
    <div style={{ position: 'absolute', top: '0', left: '0' }}>
      <p>
        {props.isCorrect
          ? `+${points[id]} очков за правильный ответ`
          : `+${points[0]} очков за правильный ответ`}
      </p>
      {/* : `Неверно!`}</p> */}
      <div>
        {'⭐'.repeat(
          props.correctAnswersCount > points.length ? points.length : props.correctAnswersCount
        )}
      </div>
      <div>Всего {score} баллов!</div>
    </div>
  );
};

export default GameScore;
