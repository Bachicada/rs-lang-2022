import { Box } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { APP_ROUTES, GAME_TYPE } from '../../utils/Constants';
import LevelModal from './LevelModal';
import { QuizContext } from '../sprint/Sprint';
import SprintGame from '../sprint/SprintGame';
// import Timer from './Timer';
import Timer from '../game/Timer';
import { LoadingIcon } from '../shared/LoadingIcon';
import styles from './Game.module.css'
import GameTableResult from './GameTableResult';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router';
import AudioGame from '../audiocall/AudioGame';
import { AudioContext } from './Audiocall';
import GameLife from './GameLife';
import CircularProgress from '@mui/material/CircularProgress';
import Utils from '../../utils/Utils';
import { getHardWords } from '../../services/UserWordService';
import { getPartOfTextbook } from '../../services/WordService';

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
      const id = window.setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
      setTimeId(id);
    } 
    else if (!cleanupFunction && seconds <= 0) {
      dispatch({ type: 'OUT_OF_TIME' });
      setSeconds(quizState.seconds);
    }
    return () => {
      if (timeId) window.clearInterval(timeId);
      cleanupFunction = true
    };
  }, [dispatch, quizState.isGameFinished, quizState.timerActive, seconds]);

  useEffect(() => {
    if (timeId) {
      window.clearTimeout(timeId);
    }
    setSeconds(12);
  }, [quizState.currentQuestionIndex]);

  useEffect(() => {
    const { page, part } = Utils.params;
    if (part === 'hardwords') {
      const fetchData = async() => {
        dispatch({ type: 'LOADING' })
        try {
          const prom = await getHardWords();
          const data = prom[0].paginatedResults;
          const formatData = Utils.getAudioWords(data.flat());
          const randomData = Utils.shuffleAnswers(formatData);
          randomData.forEach((item, idx) => {
            randomData[idx].item.id = randomData[idx].item._id;
          });
          dispatch({ type: 'PRELOAD', payload: {randomData, level: part} });
        } catch(err) {
          alert('Oops! Something goes wrong.')
        }
      }

      fetchData();
      Utils.setParams({ part: null, page: null });
    }
    else if (page !== null && part !== null) {
      const fetchData = async() => {
        dispatch({ type: 'LOADING' })
        const idArr: any[] = [];
        for (let i = page; i >= 0; i--) {
          idArr.push(i);
        }
        try {
          const prom = idArr.map((page) => getPartOfTextbook(`${page}`, `${part}`));
          const data = await (await Promise.allSettled(prom)).map((item: any) => item.value);
          const formatData = Utils.getAudioWords(data.flat());
          const randomData = Utils.shuffleAnswers(formatData);
          dispatch({ type: 'PRELOAD', payload: {randomData, level: part} });
        } catch(err) {
          alert('Oops! Something goes wrong.')
        }
      }

      fetchData();
      Utils.setParams({ part: null, page: null });
    }
  }, []);


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
          <CircularProgress />
        </div>}
    {quizState.isGameReady &&
        <div className={styles.game}>
          {/* {!quizState.isGameFinished &&
              <GameLife count={quizState.currentLifeIndex}/>} */}
          {!quizState.isGameFinished && 
              <Timer time={seconds} max={12} />}
          {quizState.isGameReady && !quizState.isGameFinished && 
              <AudioGame />}
          {quizState.isGameFinished && 
              <GameTableResult />}
          {quizState.isGameFinished && 
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <CloseIcon style={{cursor: 'pointer'}} onClick={() => {
                  navigate(`${APP_ROUTES.MAIN}`);
                }} sx={{fontSize: 80}}/>
                <RestartAltIcon style={{cursor: 'pointer'}} onClick={() => {
                  dispatch({ type: 'RESTART' })
                }} sx={{fontSize: 80}}/>
              </div>
          }
        </div>}
  </Box>
  )
}

export default Game