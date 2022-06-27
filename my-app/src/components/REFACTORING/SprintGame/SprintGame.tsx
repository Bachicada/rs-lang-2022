import { useEffect } from 'react';
import LevelModal from '../../game/LevelModal';
import SprintGameContent from '../../sprint/SprintGameContent';
import styles from './Game.module.css';
import GameTableResult from '../../game/GameTableResult';
import Utils from '../../../utils/Utils';
import { getPartOfTextbook } from '../../../services/WordService';
import { getHardWords } from '../../../services/UserWordService';
import CircularProgress from '@mui/material/CircularProgress';
import GameTableControls from '../../game/GameTableControls';
import { useSprintContext } from '../../../store/hooks';
import { SprintActionTypes } from '../../../types/sprintTypes';
import { StyledBox, StyledContainer } from './styles';

const getHardQuestions = async () => {
  const prom = await getHardWords();
  const data = prom[0].paginatedResults;
  const formatData = Utils.getSprintWords(data.flat());
  const randomData = Utils.shuffleAnswers(formatData);

  randomData.forEach((item, idx) => {
    randomData[idx].item.id = randomData[idx].item._id;
  });
  return randomData;
};

const getPreparedQuestions = async (page: number, part: number) => {
  const idArr: any[] = [];
  for (let i = page; i >= 0; i--) {
    idArr.push(i);
  }

  const prom = idArr.map((page) => getPartOfTextbook(`${page}`, `${part}`));
  const data = (await Promise.allSettled(prom)).map((item: any) => item.value);
  const formatData = Utils.getSprintWords(data.flat());
  const randomData = Utils.shuffleAnswers(formatData);
  return randomData;
};

const SprintGame = () => {
  const [{ isLoading, level, newWords, isGameFinished, isGameReady, answers }, dispatch] =
    useSprintContext();

  useEffect(() => {
    const { page, part } = Utils.params;
    if (!level && level !== 0) {
      return;
    }

    if (part) {
      try {
        dispatch({ type: SprintActionTypes.LOADING });
        const randomData =
          part === 'hardwords'
            ? getHardQuestions()
            : page !== null
            ? getPreparedQuestions(page, part)
            : null;

        dispatch({ type: SprintActionTypes.PRELOAD, payload: { randomData, level: part } });
      } catch (e) {
        alert('Oops! Something went wrong');
      }
    }

    // if (part === 'hardwords') {
    //   const fetchData = async () => {
    //     dispatch({ type: SprintActionTypes.LOADING });
    //     try {
    //       const prom = await getHardWords();
    //       const data = prom[0].paginatedResults;
    //       const formatData = Utils.getSprintWords(data.flat());
    //       const randomData = Utils.shuffleAnswers(formatData);

    //       randomData.forEach((item, idx) => {
    //         randomData[idx].item.id = randomData[idx].item._id;
    //       });

    //       dispatch({ type: SprintActionTypes.PRELOAD, payload: { randomData, level: part } });
    //     } catch (err) {
    //       alert('Oops! Something goes wrong.');
    //     }
    //   };

    //   fetchData();
    // } else if (page !== null && part !== null) {
    //   const fetchData = async () => {
    //     dispatch({ type: SprintActionTypes.LOADING });
    //     const idArr: any[] = [];
    //     for (let i = page; i >= 0; i--) {
    //       idArr.push(i);
    //     }
    //     try {
    //       const prom = idArr.map((page) => getPartOfTextbook(`${page}`, `${part}`));
    //       const data = (await Promise.allSettled(prom)).map((item: any) => item.value);
    //       const formatData = Utils.getSprintWords(data.flat());
    //       const randomData = Utils.shuffleAnswers(formatData);
    //       dispatch({ type: SprintActionTypes.PRELOAD, payload: { randomData, level: part } });
    //     } catch (err) {
    //       alert('Oops! Something goes wrong.');
    //     }
    //   };

    //   fetchData();
    // }
  }, [dispatch, level]);

  if (isLoading) {
    return (
      <div className={styles.gameLoadingIcon}>
        <CircularProgress />
      </div>
    );
  }

  if (level === null) {
    return <LevelModal dispatch={dispatch} />;
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
