import { Typography } from '@mui/material';
import React, { Dispatch, useEffect, useState } from 'react';
import { InitialState } from '../sprint/Sprint';

type Props = {
  quizState: InitialState;
  dispatch: Dispatch<{ type: string; payload?: any }>;
};

const TextTimer = ({ quizState, dispatch }: Props) => {
  const [seconds, setSeconds] = useState(quizState.seconds);
  const [timeId, setTimeId] = useState<number>();

  useEffect(() => {
    let cleanupFunction = false;

    if (!cleanupFunction) {
      if (seconds > 0 && quizState.timerActive && !quizState.isGameFinished) {
        const id = window.setTimeout(setSeconds, 1000, seconds - 1);
        setTimeId(id);
      } else if (seconds <= 0 && quizState.isGameReady) {
        dispatch({ type: 'FINISH_GAME' });
      }
    }

    return () => {
      if (timeId) window.clearTimeout(timeId);
      cleanupFunction = true;
    };
  }, [dispatch, quizState.isGameFinished, quizState.timerActive, seconds]);

  return <Typography>{seconds}с</Typography>;
};

export default TextTimer;
