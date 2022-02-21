import React from 'react'

interface GameScoreProps {
  correctAnswersCount: number;
  isCorrect: boolean;
}

const GameScore = (props: GameScoreProps) => {
  if (!props.isCorrect) {
    return (
      <div>
        <p>Неверно!</p>
      </div>
    )
  }
  const points = [10, 20, 40, 80];
  const id = props.correctAnswersCount > (points.length - 1) 
      ? points.length - 1 
      : props.correctAnswersCount
  return (
    <div>
      <p>+{points[id]} очков!</p>
    </div>
  )
}

export default GameScore