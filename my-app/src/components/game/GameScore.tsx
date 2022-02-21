interface GameScoreProps {
  correctAnswersCount: number;
  isCorrect: boolean;
}

const GameScore = (props: GameScoreProps) => {
  const points = [10, 20, 40, 80];
  const id = props.correctAnswersCount > (points.length - 1) 
      ? points.length - 1 
      : props.correctAnswersCount
  return (
    <div style={{position: 'absolute', top: '0', left: '0'}}>
      <p>{props.isCorrect 
          ? `+${points[id]} очков!`
          : `Неверно!`}</p>
    </div>
  )
}

export default GameScore