import React, { Dispatch, SetStateAction } from 'react'

interface TimerProps {
  time: number;
  setTimerActive: Dispatch<SetStateAction<boolean>>;
  isGameReady: boolean;
}

const Timer = (props: TimerProps) => {
  if(!props.isGameReady) {
    return <div>60</div>
  } else {
    return (
      <div>{props.time}</div>
    )
  }
}

export default Timer