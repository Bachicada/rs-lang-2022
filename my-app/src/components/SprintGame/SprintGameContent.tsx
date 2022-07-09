import { useEffect } from 'react';
import { updateUserWord } from '../../services/UserWordService';
import { API_URL, GAME_TYPE, WORD_STATUS } from '../../utils/Constants';
import GameControls from '../Game/GameControls';
import GameQuestion from './GameQuestion';
import GameBtns from './GameBtns';
import { StyledStack } from '../Game/styles';
import { useSprintContext } from '../../store/hooks';
import { SprintActionTypes } from '../../types/sprintTypes';

const SprintGameContent = () => {
  const [
    { correctAnswersCount, questions, currentQuestionIndex, score, seconds, isTimerActive },
    dispatch,
  ] = useSprintContext();

  useEffect(() => {
    if (seconds <= 0) {
      dispatch({ type: SprintActionTypes.FINISH_GAME });
    }

    const timerId = setTimeout(dispatch, 1000, { type: SprintActionTypes.TIME_TICK });

    return () => {
      clearTimeout(timerId);
    };
  }, [seconds, dispatch]);

  const question = questions[currentQuestionIndex];
  if (!question) {
    return null;
  }

  const { item } = question;
  const audio = new Audio(`${API_URL}/${item.audio}`);

  const dispatchAnswer = (isAnswerCorrect: boolean) => {
    const [failCounter, successCounter] = [+!isAnswerCorrect, +isAnswerCorrect];

    const content = updateUserWord({
      wordId: `${item.id}`,
      word: {
        difficulty: WORD_STATUS.NEW,
        optional: {
          failCounter,
          successCounter,
        },
      },
    });

    dispatch({ type: SprintActionTypes.ADD_NEW, payload: content });

    const answer = {
      item,
      answer: isAnswerCorrect,
    };

    dispatch({
      type: isAnswerCorrect ? SprintActionTypes.CORRECT_ANSWER : SprintActionTypes.INCORRECT_ANSWER,
      payload: answer,
    });
  };

  return (
    <>
      <StyledStack direction="column" spacing={2}>
        <GameControls
          type={GAME_TYPE.SPRINT}
          audio={audio}
          score={score}
          correctAnswersCount={correctAnswersCount}
          seconds={seconds}
          isTimerActive={isTimerActive}
        />

        <GameQuestion question={question} item={item} />

        <GameBtns isCorrect={question.correct} dispatchAnswer={dispatchAnswer} />
      </StyledStack>
    </>
  );
};

export default SprintGameContent;
