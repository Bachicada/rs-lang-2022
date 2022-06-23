import { Box } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { APP_ROUTES, GAME_TYPE } from '../../utils/Constants';
import LevelModal from './LevelModal';
import { QuizContext } from '../sprint/Sprint';
import SprintGame from '../sprint/SprintGame';
import Timer from './Timer';
import { LoadingIcon } from '../shared/LoadingIcon';
import styles from './Game.module.css';
import GameTableResult from './GameTableResult';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router';
import AudioGame from '../audiocall/AudioGame';
import Utils from '../../utils/Utils';
import { getPartOfTextbook } from '../../services/WordService';
import { getHardWords } from '../../services/UserWordService';
import CircularProgress from '@mui/material/CircularProgress';
import GameTableControls from './GameTableControls';

interface GameProps {
  type: GAME_TYPE;
}

const Game = (props: GameProps) => {
  const [quizState, dispatch] = useContext(QuizContext);
  const [seconds, setSeconds] = React.useState(1000);
  const [timeId, setTimeId] = React.useState<number>();
  const navigate = useNavigate();

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
  // }, [ quizState.timerActive ,seconds, quizState.isGameFinished ]);

  useEffect(() => {
    setSeconds(1000);
  }, [quizState.level]);

  useEffect(() => {
    const { page, part } = Utils.params;
    if (part === 'hardwords') {
      const fetchData = async () => {
        dispatch({ type: 'LOADING' });
        try {
          const prom = await getHardWords();
          const data = prom[0].paginatedResults;
          const formatData = Utils.getSprintWords(data.flat());
          const randomData = Utils.shuffleAnswers(formatData);
          randomData.forEach((item, idx) => {
            randomData[idx].item.id = randomData[idx].item._id;
          });
          dispatch({ type: 'PRELOAD', payload: { randomData, level: part } });
        } catch (err) {
          alert('Oops! Something goes wrong.');
        }
      };

      fetchData();
    } else if (page !== null && part !== null) {
      const fetchData = async () => {
        dispatch({ type: 'LOADING' });
        const idArr: any[] = [];
        for (let i = page; i >= 0; i--) {
          idArr.push(i);
        }
        try {
          const prom = idArr.map((page) => getPartOfTextbook(`${page}`, `${part}`));
          const data = await (await Promise.allSettled(prom)).map((item: any) => item.value);
          const formatData = Utils.getSprintWords(data.flat());
          const randomData = Utils.shuffleAnswers(formatData);
          dispatch({ type: 'PRELOAD', payload: { randomData, level: part } });
        } catch (err) {
          alert('Oops! Something goes wrong.');
        }
      };

      fetchData();
    }
  }, []);

  if (quizState.isLoading) {
    return (
      <div className={styles.gameLoadingIcon}>
        <CircularProgress />
      </div>
    );
  }

  if (quizState.level === null) {
    return <LevelModal />;
  }

  if (quizState.isGameFinished) {
    return (
      <>
        <GameTableResult />
        <GameTableControls dispatch={dispatch} />
      </>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: 'calc(100vh - 64px - 64px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {quizState.isGameReady && (
        <div className={styles.game}>
          {!quizState.isGameFinished && <Timer time={seconds} max={60} />}
          {props.type === GAME_TYPE.AUDIOCALL ? <AudioGame /> : null}
          {props.type === GAME_TYPE.SPRINT
            ? quizState.isGameReady && !quizState.isGameFinished && <SprintGame />
            : null}
        </div>
      )}
    </Box>
  );
};

export default Game;
