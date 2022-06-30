import { useEffect, useState } from 'react';
import LevelModal from '../Game/LevelModal';
import SprintGameContent from './SprintGameContent';
import styles from './Game.module.css';
import GameTableResult from '../Game/GameTableResult';
import Utils from '../../../utils/Utils';
import { getPartOfTextbook } from '../../../services/WordService';
import { getHardWords } from '../../../services/UserWordService';
import CircularProgress from '@mui/material/CircularProgress';
import GameTableControls from '../Game/GameTableControls';
import { useSprintContext } from '../../../store/hooks';
import { SprintActionTypes } from '../../../types/sprintTypes';
import { StyledBox, StyledContainer } from './styles';

const SprintGame = () => {
  const [
    { isLoading, level: initialLevel, newWords, isGameFinished, isGameReady, answers },
    dispatch,
  ] = useSprintContext();
  const [level, setLevel] = useState(initialLevel);

  useEffect(() => {
    const { page, part } = Utils.params;

    if (level || level === 0) {
      const fetchData = async () => {
        dispatch({ type: SprintActionTypes.LOADING });

        try {
          const data = [
            await getPartOfTextbook(`${Utils.random(0, 29)}`, `${level}`),
            await getPartOfTextbook(`${Utils.random(0, 29)}`, `${level}`),
            await getPartOfTextbook(`${Utils.random(0, 29)}`, `${level}`),
          ];
          const result = Utils.getRandomWords(data);
          dispatch({ type: SprintActionTypes.CHANGE_LEVEL, payload: { result, level } });
        } catch (err) {
          alert('Oops! Something goes wrong.');
        }
      };

      fetchData();
    }

    if (part) {
      try {
        dispatch({ type: SprintActionTypes.LOADING });
        if (part === 'hardwords') {
          Utils.getHardQuestions().then((randomData) => {
            dispatch({ type: SprintActionTypes.PRELOAD, payload: { randomData, level: part } });
          });
        } else if (page !== null) {
          Utils.getPreparedQuestions(page, part).then((randomData) => {
            dispatch({ type: SprintActionTypes.PRELOAD, payload: { randomData, level: part } });
          });
        }
      } catch (e) {
        alert('Oops! Something went wrong');
      }
    }
  }, [dispatch, level]);

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
        <GameTableResult
          answers={answers}
          isGameFinished={isGameFinished}
          newWords={newWords}
          dispatch={dispatch}
        />
        <GameTableControls dispatch={dispatch} />
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
