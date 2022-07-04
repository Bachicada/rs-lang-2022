import { useEffect, useState } from 'react';
import LevelModal from '../Game/LevelModal';
import SprintGameContent from './SprintGameContent';
import styles from './Game.module.css';
import GameTableResult from '../Game/GameTableResult';
import Utils from '../../../utils/Utils';
import { getPartOfTextbook } from '../../../services/WordService';
// import { getHardWords } from '../../../services/UserWordService';
import CircularProgress from '@mui/material/CircularProgress';
import GameTableControls from '../Game/GameTableControls';
import { useSprintContext } from '../../../store/hooks';
import { SprintActionTypes } from '../../../types/sprintTypes';
import { StyledBox, StyledContainer } from './styles';
import { useGetSprintWords } from '../../../hooks/useGetSprintWords';

const SprintGame = () => {
  const [
    { isLoading, level: initialLevel, newWords, isGameFinished, isGameReady, answers },
    dispatch,
  ] = useSprintContext();

  const [level, setLevel] = useState(initialLevel);
  const {
    response,
    error,
    isLoading: requestLoading,
  } = useGetSprintWords({ level, part: Utils.params.part, page: Utils.params.page });

  useEffect(() => {
    if ((level || level === 0) && requestLoading) {
      dispatch({ type: SprintActionTypes.LOADING });
    }

    if (error) {
      alert(error);
    }

    if (response && response.length > 0) {
      dispatch({ type: SprintActionTypes.CHANGE_LEVEL, payload: { result: response, level } });
    }
  }, [dispatch, error, level, requestLoading, response]);

  const restartGame = () => {
    dispatch({ type: SprintActionTypes.RESTART });
  };

  const setScore = (data: any) => {
    dispatch({ type: SprintActionTypes.SET_SCORE, payload: data });
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
        <GameTableControls restartGame={restartGame} />
        <GameTableResult answers={answers} newWords={newWords} setScore={setScore} />
      </>
    );
  }

  return (
    <StyledBox>
      {isGameReady && (
        <div className={styles.game}>
          <StyledContainer maxWidth="md">
            <SprintGameContent />
          </StyledContainer>
        </div>
      )}
    </StyledBox>
  );
};

export default SprintGame;
