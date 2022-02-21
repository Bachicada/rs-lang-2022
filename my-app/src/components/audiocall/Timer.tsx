import { useContext } from 'react'
import { AudioContext } from './Audiocall';
import styles from './Game.module.css'

interface TimerProps {
  time: number;
}

const Timer = (props: TimerProps) => {
  return (
    <div className={styles.timer}>{props.time}</div>
  )
}

export default Timer