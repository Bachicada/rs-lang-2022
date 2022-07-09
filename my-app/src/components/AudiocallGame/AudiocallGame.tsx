import React, { useEffect, useState } from 'react';
import { useAudiocallContext } from '../../store/hooks';
import { StyledBox, StyledContainer } from './styles';
import GameTableControls from '../Game/GameTableControls';
import LevelModal from '../Game/LevelModal';
import GameTableResult from '../Game/GameTableResult';
import AudiocallGameContent from './AudiocallGameContent';
import { AudiocallActionTypes } from '../../types/audiocallTypes';
import { useGetAudioWords } from '../../hooks/useGetAudioWords';
import Loading from '../shared/Loading';

const AudiocallGame = () => {
  const [
    { level: initialLevel, isLoading, isGameReady, isGameFinished, answers, newWords },
    dispatch,
  ] = useAudiocallContext();

  const [level, setLevel] = useState(initialLevel);
  const { response, error, isLoading: requestLoading } = useGetAudioWords({ level });

  useEffect(() => {
    if ((level || level === 0) && requestLoading) {
      dispatch({ type: AudiocallActionTypes.LOADING });
    }

    if (error) {
      alert(error);
    }

    if (response && response.length > 0) {
      dispatch({ type: AudiocallActionTypes.CHANGE_LEVEL, payload: { result: response, level } });
    }
  }, [dispatch, error, level, requestLoading, response]);

  const restartGame = () => {
    dispatch({ type: AudiocallActionTypes.RESTART });
  };

  const setScore = (data: any) => {
    dispatch({ type: AudiocallActionTypes.SET_SCORE, payload: data });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (initialLevel === null) {
    return <LevelModal setLevel={setLevel} />;
  }

  if (isGameFinished) {
    return (
      <>
        <GameTableControls restartGame={restartGame} />
        <GameTableResult answers={answers} newWords={newWords} setScore={setScore} />
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
