import { Dispatch, SetStateAction } from 'react'
import styles from './Game.module.css'

interface TimerProps {
  time: number;
  setTimerActive: Dispatch<SetStateAction<boolean>>;
  isGameReady: boolean;
}

const Timer = (props: TimerProps) => {
  if(!props.isGameReady) {
    return <div className={styles.timer}>60</div>
  } else {
    return (
      <div className={styles.timer}>{props.time}</div>
    )
  }
}

export default Timer