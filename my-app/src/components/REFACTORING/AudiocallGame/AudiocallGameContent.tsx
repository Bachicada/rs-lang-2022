import { useEffect, useMemo } from 'react';
import { updateUserWord } from '../../../services/UserWordService';
import { API_URL, GAME_TYPE, WORD_STATUS } from '../../../utils/Constants';
import { useAudiocallContext } from '../../../store/hooks';
import { AudiocallActionTypes } from '../../../types/audiocallTypes';
import { StyledStack } from '../Game/styles';
import GameControls from '../Game/GameControls';
import GameQuestion from './GameQuestion';
import GameBtns from './GameBtns';

const AudiocallGameContent = () => {
  const [
    {
      questions,
      currentQuestionIndex,
      correctAnswersCount,
      currentLifeIndex,
      score,
      secondsPerQuestion: seconds,
      isTimerActive,
    },
    dispatch,
  ] = useAudiocallContext();

  const question = questions[currentQuestionIndex];
  const { item } = question;
  const audio = useMemo(() => new Audio(`${API_URL}/${item.audio}`), [item.audio]);

  useEffect(() => {
    if (seconds <= 0) {
      dispatch({ type: AudiocallActionTypes.OUT_OF_TIME });
    }

    const timerId = setTimeout(dispatch, 1000, { type: AudiocallActionTypes.TIME_TICK });

    return () => {
      clearTimeout(timerId);
    };
  }, [seconds, dispatch]);

  const dispatchAnswer = (isAnswerCorrect: boolean) => {
    const [failCounter, successCounter] = [+!isAnswerCorrect, +isAnswerCorrect];
    const answer = {
      item,
      answer: isAnswerCorrect,
      audio: new Audio(`${API_URL}/${item.audio}`),
    };

    const content = updateUserWord({
      wordId: item.id + '',
      word: {
        difficulty: WORD_STATUS.NEW,
        optional: {
          failCounter,
          successCounter,
        },
      },
    });

    dispatch({ type: AudiocallActionTypes.ADD_NEW, payload: content });

    isAnswerCorrect
      ? dispatch({ type: AudiocallActionTypes.CORRECT_ANSWER, payload: answer })
      : dispatch({ type: AudiocallActionTypes.INCORRECT_ANSWER, payload: answer });
  };

  useEffect(() => {
    audio.play();
  }, [audio]);

  return (
    <>
      <StyledStack direction="column" spacing={2}>
        <GameControls
          type={GAME_TYPE.AUDIOCALL}
          audio={audio}
          score={score}
          correctAnswersCount={correctAnswersCount}
          seconds={seconds}
          isTimerActive={isTimerActive}
          currentLifeIndex={currentLifeIndex}
        />

        <GameQuestion question={item} />

        <GameBtns
          answers={question.incorrect}
          correctAnswer={item.wordTranslate}
          dispatchAnswer={dispatchAnswer}
        />
      </StyledStack>
    </>
  );
};

export default AudiocallGameContent;
