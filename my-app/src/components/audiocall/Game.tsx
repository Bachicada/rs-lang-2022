import { Box } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { APP_ROUTES, GAME_TYPE } from '../../utils/Constants';
import LevelModal from './LevelModal';
import { QuizContext } from '../../pages/sprint/Sprint';
import SprintGame from '../REFACTORING/SprintGame/SprintGameContent';
// import Timer from './Timer';
import Timer from '../game/Timer';
import { LoadingIcon } from '../shared/LoadingIcon';
import styles from './Game.module.css';
import GameTableResult from './GameTableResult';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router';
import AudioGame from '../audiocall/AudioGame';
import { AudioContext } from './Audiocall';
import GameLife from './GameLife';
import CircularProgress from '@mui/material/CircularProgress';

interface GameProps {
  type: GAME_TYPE;
}

const Game = (props: GameProps) => {
  const [quizState, dispatch] = useContext(AudioContext);
  const [seconds, setSeconds] = useState(quizState.seconds);
  const [timeId, setTimeId] = useState<number>();
  const navigate = useNavigate();

  useEffect(() => {
    let cleanupFunction = false;
    if (!cleanupFunction && seconds > 0 && quizState.timerActive && !quizState.isGameFinished) {
      // setTimeout(setSeconds, 1000, seconds - 1);
      const id = window.setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
      setTimeId(id);
    } else if (!cleanupFunction && seconds <= 0) {
      dispatch({ type: 'OUT_OF_TIME' });
      setSeconds(quizState.seconds);
    }
    return () => {
      if (timeId) window.clearInterval(timeId);
      cleanupFunction = true;
    };
  }, [dispatch, quizState.isGameFinished, quizState.timerActive, seconds]);

  useEffect(() => {
    if (timeId) {
      window.clearTimeout(timeId);
    }
    setSeconds(12);
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
      {quizState.level !== null ? null : <LevelModal />}
      {quizState.isLoading && (
        <div className={styles.gameLoadingIcon}>
          <CircularProgress />
        </div>
      )}
      {quizState.isGameReady && (
        <div className={styles.game}>
          {/* {!quizState.isGameFinished &&
              <GameLife count={quizState.currentLifeIndex}/>} */}
          {!quizState.isGameFinished && <Timer time={seconds} max={12} />}
          {quizState.isGameReady && !quizState.isGameFinished && <AudioGame />}
          {quizState.isGameFinished && <GameTableResult />}
          {quizState.isGameFinished && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <CloseIcon
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  navigate(`${APP_ROUTES.MAIN}`);
                }}
                sx={{ fontSize: 80 }}
              />
              <RestartAltIcon
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  dispatch({ type: 'RESTART' });
                }}
                sx={{ fontSize: 80 }}
              />
            </div>
          )}
        </div>
      )}
    </Box>
  );
};

export default Game;
