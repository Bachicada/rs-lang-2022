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

  const restartGame = () => {
    dispatch({ type: AudiocallActionTypes.RESTART });
  };

  const setScore = (data: any) => {
    dispatch({ type: AudiocallActionTypes.SET_SCORE, payload: data });
  };

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
        <GameTableResult answers={answers} newWords={newWords} setScore={setScore} />
        <GameTableControls restartGame={restartGame} />
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
  );
};

export default AudiocallGame;
