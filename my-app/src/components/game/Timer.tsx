import { useContext } from 'react'
import { QuizContext } from '../sprint/Sprint';
import styles from './Game.module.css'
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import { Box, Typography } from '@mui/material';

interface TimerProps {
  time: number;
}

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number },
) {
  const percent = (60 / props.value) * 100;
  return (
    <Box className={styles.timer} sx={{ position: 'absolute', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} value={percent} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}с`}</Typography>
      </Box>
    </Box>
  );
}

const Timer = (props: TimerProps) => {
  const [quizState, dispatch] = useContext(QuizContext);
  // if(!quizState.isGameReady && quizState.isGameFinished) {
  //   return <div className={styles.timer}>60</div>
  // } else {
  //   return (
  //     <div className={styles.timer}>{props.time}</div>
  //   )
  // }
  return (
    <CircularProgressWithLabel value={props.time} />
  )
}

export default Timer