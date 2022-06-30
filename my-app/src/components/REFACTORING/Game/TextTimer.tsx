import { Typography } from '@mui/material';
import { useEffect } from 'react';

type Props = {
  seconds: number;
  isTimerActive: boolean;
  onTimeTick: () => void;
  onTimeOver: () => void;
};

const TextTimer = ({ seconds, isTimerActive, onTimeOver, onTimeTick }: Props) => {
  useEffect(() => {
    if (!isTimerActive) {
      return;
    }

    if (seconds <= 0) {
      onTimeOver();
    }

    const timeId = setTimeout(onTimeTick, 1000);

    return () => {
      if (timeId) {
        clearTimeout(timeId);
      }
    };
  }, [isTimerActive, onTimeOver, onTimeTick, seconds]);

  return <Typography>{seconds}с</Typography>;
};

export default TextTimer;
