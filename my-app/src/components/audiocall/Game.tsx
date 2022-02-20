import { Box } from '@mui/material';
import React, { useContext, useEffect } from 'react'
import { APP_ROUTES, GAME_TYPE } from '../../utils/Constants';
import LevelModal from './LevelModal';
import { QuizContext } from '../sprint/Sprint';
import SprintGame from '../sprint/SprintGame';
import Timer from './Timer';
import { LoadingIcon } from '../shared/LoadingIcon';
import styles from './Game.module.css'
import GameTableResult from './GameTableResult';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router';
import AudioGame from '../audiocall/AudioGame';
import { AudioContext } from './Audiocall';

interface GameProps {
  type: GAME_TYPE;
}

const Game = (props: GameProps) => {
  const [quizState, dispatch] = useContext(AudioContext);
  const [ seconds, setSeconds ] = React.useState(60);
  const navigate = useNavigate();

  useEffect(() => {
    if (seconds > 0 && quizState.timerActive && !quizState.isGameFinished) {
      setTimeout(setSeconds, 1000, seconds - 1);
    } 
    else if (seconds <= 0) {
      dispatch({ type: 'FINISH_GAME' });
    }
  }, [dispatch, quizState.isGameFinished, quizState.timerActive, seconds]);
  // }, [ quizState.timerActive ,seconds, quizState.isGameFinished ]);

  return (
    <Box
    sx={{
      width: '100%',
      height: 'calc(100vh - 64px - 25px - 48px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }}
  >
    {quizState.level !== null 
        ? null 
        : <LevelModal />}
    {quizState.isLoading && 
        <div className={styles.gameLoadingIcon}>
          <LoadingIcon />
        </div>}
    {quizState.isGameReady &&
        <div className={styles.game}>
          {!quizState.isGameFinished && 
              <Timer time={seconds} />}
          {props.type === GAME_TYPE.AUDIOCALL 
              ? <AudioGame /> 
              : null}
          {props.type === GAME_TYPE.SPRINT 
              ? quizState.isGameReady && !quizState.isGameFinished &&
                  <AudioGame /> 
              : null}
          {quizState.isGameFinished && 
              <GameTableResult />}
          {quizState.isGameFinished && 
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <CloseIcon onClick={() => {
                  navigate(`${APP_ROUTES.MAIN}`);
                }} sx={{fontSize: 80}}/>
                <RestartAltIcon onClick={() => {
                  dispatch({ type: 'RESTART' })
                }} sx={{fontSize: 80}}/>
              </div>
          }
        </div>}
  </Box>
  )
}

export default Game