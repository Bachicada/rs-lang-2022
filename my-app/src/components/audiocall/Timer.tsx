import { useContext } from 'react'
import { AudioContext } from './Audiocall';
import styles from './Game.module.css'

interface TimerProps {
  time: number;
}

const Timer = (props: TimerProps) => {
  const [quizState, dispatch] = useContext(AudioContextq);
  if(!quizState.isGameReady && quizState.isGameFinished) {
    return <div className={styles.timer}>60</div>
  } else {
    return (
      <div className={styles.timer}>{props.time}</div>
    )
  }
}

export default Timer