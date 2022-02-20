import { Box } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
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
  const [ seconds, setSeconds ] = useState(quizState.seconds);
  const [timeId, setTimeId] = useState<number>();
  const navigate = useNavigate();

  useEffect(() => {
    let cleanupFunction = false;
    if (!cleanupFunction && seconds > 0 && quizState.timerActive && !quizState.isGameFinished) {
      // setTimeout(setSeconds, 1000, seconds - 1);
      const a = window.setTimeout(() => {
        console.log('TIMEOUT', seconds);
        setSeconds(seconds - 1);
      }, 1000);
      setTimeId(a);
    } 
    else if (!cleanupFunction && seconds <= 0) {
      dispatch({ type: 'OUT_OF_TIME' });
      setSeconds(quizState.seconds);
    }
    return () => {cleanupFunction = true};
  }, [dispatch, quizState.isGameFinished, quizState.timerActive, seconds]);

  useEffect(() => {
    if(timeId) {
      window.clearTimeout(timeId);
      console.log('CLEAR TIMEOUT!');
    }
    setSeconds(12);
    console.log('CHANGE IDX', seconds);
  }, [quizState.currentQuestionIndex]);

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
          {<p>{quizState.currentLifeIndex}</p>}
          {!quizState.isGameFinished && 
              <Timer time={seconds} />}
          {quizState.isGameReady && !quizState.isGameFinished && 
              <AudioGame />}
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