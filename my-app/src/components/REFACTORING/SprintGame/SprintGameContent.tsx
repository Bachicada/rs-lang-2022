import { useCallback, useEffect, useState } from 'react';
import { updateUserWord } from '../../../services/UserWordService';
import { API_URL, GAME_TYPE, WORD_STATUS } from '../../../utils/Constants';
import GameControls from '../Game/GameControls';
import GameQuestion from './GameQuestion';
import GameBtns from './GameBtns';
import { StyledStack } from '../Game/styles';
import { useSprintContext } from '../../../store/hooks';
import { SprintActionTypes } from '../../../types/sprintTypes';

const SprintGameContent = () => {
  const [
    { correctAnswersCount, questions, currentQuestionIndex, score, seconds, isTimerActive },
    dispatch,
  ] = useSprintContext();

  const question = questions[currentQuestionIndex];
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

  const onTimeOver = () => {
    dispatch({ type: SprintActionTypes.FINISH_GAME });
  };

  const onTimeTick = () => {
    dispatch({ type: SprintActionTypes.TIME_TICK });
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
          onTimeTick={onTimeTick}
          onTimeOver={onTimeOver}
        />

        <GameQuestion question={question} item={item} />

        <GameBtns isCorrect={question.correct} dispatchAnswer={dispatchAnswer} />
      </StyledStack>
    </>
  );
};

export default SprintGameContent;
