import { useContext } from 'react'
import { QuizContext } from '../sprint/Sprint';
import styles from './Game.module.css'

interface TimerProps {
  time: number;
}

const Timer = (props: TimerProps) => {
  const [quizState, dispatch] = useContext(QuizContext);
  if(!quizState.isGameReady && quizState.isGameFinished) {
    return <div className={styles.timer}>60</div>
  } else {
    return (
      <div className={styles.timer}>{props.time}</div>
    )
  }
}

export default Timer