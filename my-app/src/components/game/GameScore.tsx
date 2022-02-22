import { Paper } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { QuizContext } from "../sprint/Sprint";

interface GameScoreProps {
  correctAnswersCount: number;
  isCorrect: boolean;
}

const GameScore = (props: GameScoreProps) => {
  const [quizState, dispatch] = React.useContext(QuizContext);
  const [score, setScore] = useState(0);
  const points = [10, 20, 40, 80];
  const stars = ['⭐', '⭐', '⭐', '⭐'];
  const id = props.correctAnswersCount > (points.length - 1) 
      ? points.length - 1 
      : props.correctAnswersCount
  
  useEffect(() => {
    if(quizState.currentQuestionIndex && props.isCorrect) {
        setScore((prev) => prev + points[id - 1]);
        dispatch({ type: 'SET_RECORD', payload: score });
    }
  }, [quizState.currentQuestionIndex]);
  return (
    <Paper elevation={3} style={{position: 'absolute', top: '0', left: '0', border: '1px solid #5393E1',
        borderRadius: '5px', padding: '10px'
    }}>
      <p>{props.isCorrect 
          ? `+${points[id]} очков за правильный ответ`
          : `+${points[0]} очков за правильный ответ`}</p>
          {/* : `Неверно!`}</p> */}
      <div>
        {stars.map((item, idx) => {
          return props.correctAnswersCount > idx 
              ? <span>{item}</span>
              : <span style={{filter: 'grayscale(1)'}}>{item}</span>
        })}
      </div>
      <div>
        Всего {score} баллов!
      </div>
    </Paper>
  )
}

export default GameScore