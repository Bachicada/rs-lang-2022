import { Typography } from '@mui/material';
import { Dispatch, useEffect, useState } from 'react';
import {
  InitialSprintState,
  SprintReducerAction,
  SprintActionTypes,
} from '../../../types/sprintTypes';

type Props = {
  quizState: InitialSprintState;
  dispatch: Dispatch<SprintReducerAction>;
};

const TextTimer = ({
  quizState: { isGameFinished, isGameReady, isTimerActive, seconds },
  dispatch,
}: Props) => {
  const [timerSeconds, setTimerSeconds] = useState(seconds);
  const [timeId, setTimeId] = useState<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (timerSeconds > 0 && isTimerActive && !isGameFinished) {
      const id = setTimeout(setTimerSeconds, 1000, timerSeconds - 1);
      setTimeId(id);
    } else if (timerSeconds <= 0 || seconds <= 0) {
      dispatch({ type: SprintActionTypes.FINISH_GAME });
    }

    return () => {
      if (timeId) {
        clearTimeout(timeId);
      }
    };
    // Can't add timeId variable because this will trigger maximum update depth.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isGameFinished, isTimerActive, seconds, timerSeconds]);
  if (!isGameReady) {
    return null;
  }

  return <Typography>{timerSeconds}с</Typography>;
};

export default TextTimer;
