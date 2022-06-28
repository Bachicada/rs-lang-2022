import { Box } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { APP_ROUTES, GAME_TYPE } from '../../../utils/Constants';
// import Timer from './Timer';
import { LoadingIcon } from '../../shared/LoadingIcon';
import styles from './Game.module.css';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router';
// import AudioGame from '../../audiocall/AudioGame';
// import GameLife from '../../audiocall/GameLife';
import CircularProgress from '@mui/material/CircularProgress';
import { useAudiocallContext } from '../../../store/hooks';
import { StyledBox, StyledContainer } from './styles';
import GameTableControls from '../Game/GameTableControls';
import LevelModal from '../Game/LevelModal';
import GameTableResult from '../Game/GameTableResult';
import AudiocallGameContent from './AudiocallGameContent';
import { AudiocallActionTypes } from '../../../types/audiocallTypes';
import { getPartOfTextbook } from '../../../services/WordService';
import Utils from '../../../utils/Utils';

// interface Props {
//   type: GAME_TYPE;
// }

const AudiocallGame = () => {
  const [
    { level: initialLevel, isLoading, isGameReady, isGameFinished, answers, newWords },
    dispatch,
  ] = useAudiocallContext();

  const [level, setLevel] = useState(initialLevel);

  useEffect(() => {
    if (level || level === 0) {
      const fetchData = async () => {
        dispatch({ type: AudiocallActionTypes.LOADING });

        try {
          const data = [
            await getPartOfTextbook(`${Utils.random(0, 29)}`, `${level}`),
            await getPartOfTextbook(`${Utils.random(0, 29)}`, `${level}`),
            await getPartOfTextbook(`${Utils.random(0, 29)}`, `${level}`),
          ];
          const result = Utils.getAudioWords(data);
          dispatch({ type: AudiocallActionTypes.CHANGE_LEVEL, payload: { result, level } });
        } catch (err) {
          alert('Oops! Something goes wrong.');
        }
      };

      fetchData();
    }
  }, [dispatch, level]);

  // const [seconds, setSeconds] = useState(quizState.seconds);
  // const [timeId, setTimeId] = useState<number>();

  // useEffect(() => {
  //   let cleanupFunction = false;
  //   if (!cleanupFunction && seconds > 0 && quizState.timerActive && !quizState.isGameFinished) {
  //     // setTimeout(setSeconds, 1000, seconds - 1);
  //     const id = window.setTimeout(() => {
  //       setSeconds(seconds - 1);
  //     }, 1000);
  //     setTimeId(id);
  //   } else if (!cleanupFunction && seconds <= 0) {
  //     dispatch({ type: 'OUT_OF_TIME' });
  //     setSeconds(quizState.seconds);
  //   }
  //   return () => {
  //     if (timeId) window.clearInterval(timeId);
  //     cleanupFunction = true;
  //   };
  // }, [dispatch, quizState.isGameFinished, quizState.timerActive, seconds]);

  // useEffect(() => {
  //   if (timeId) {
  //     window.clearTimeout(timeId);
  //   }
  //   setSeconds(12);
  // }, [quizState.currentQuestionIndex]);

  if (isLoading) {
    return (
      <div className={styles.gameLoadingIcon}>
        <CircularProgress />
      </div>
    );
  }

  if (initialLevel === null) {
    return <LevelModal setLevel={setLevel} />;
  }

  if (isGameFinished) {
    return (
      <>
        {/* <GameTableResult
          answers={answers}
          isGameFinished={isGameFinished}
          newWords={newWords}
          dispatch={dispatch}
        />
        <GameTableControls dispatch={dispatch} /> */}
      </>
    );
  }

  return (
    <StyledBox>
      {isGameReady && (
        <StyledContainer maxWidth="md">
          <AudiocallGameContent />
        </StyledContainer>
      )}
    </StyledBox>
    // {/* {!quizState.isGameFinished &&
    //         <GameLife count={quizState.currentLifeIndex}/>} */}
    //     {/* {!quizState.isGameFinished && <Timer time={seconds} max={12} />} */}
    //     {/* {quizState.isGameReady && !quizState.isGameFinished && <AudioGame />} */}

    //     {/* {quizState.isGameFinished && <GameTableResult />} */}
    //     {/* {quizState.isGameFinished && (
    //       <div style={{ display: 'flex', flexDirection: 'column' }}>
    //         <CloseIcon
    //           style={{ cursor: 'pointer' }}
    //           onClick={() => {
    //             navigate(`${APP_ROUTES.MAIN}`);
    //           }}
    //           sx={{ fontSize: 80 }}
    //         />
    //         <RestartAltIcon
    //           style={{ cursor: 'pointer' }}
    //           onClick={() => {
    //             dispatch({ type: 'RESTART' });
    //           }}
    //           sx={{ fontSize: 80 }}
    //         />
    //       </div>
    //     )} */}
  );
};

export default AudiocallGame;
