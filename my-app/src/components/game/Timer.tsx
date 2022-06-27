import styles from './Game.module.css';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import { Box, Typography } from '@mui/material';

interface TimerProps {
  time: number;
  max: number;
}

function CircularProgressWithLabel(props: CircularProgressProps & { value: number; max: number }) {
  const percent = 100 / (props.max / props.value);
  return (
    <Box className={styles.timer} sx={{ display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} value={percent} />
      <Box
        sx={{
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">{`${Math.round(
          props.value
        )}`}</Typography>
      </Box>
    </Box>
  );
}

const Timer = ({ time, max }: TimerProps) => {
  return <CircularProgressWithLabel value={time} max={max} />;
};

export default Timer;
