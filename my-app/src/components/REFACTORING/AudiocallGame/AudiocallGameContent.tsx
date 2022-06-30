import { useEffect } from 'react';
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
    dispatch({ type: AudiocallActionTypes.ADD_NEW, payload: content });

    const answer = {
      item,
      answer: isAnswerCorrect,
      audio: new Audio(`${API_URL}/${item.audio}`),
    };

    dispatch({
      type: isAnswerCorrect
        ? AudiocallActionTypes.CORRECT_ANSWER
        : AudiocallActionTypes.INCORRECT_ANSWER,
      payload: answer,
    });
  };

  const onTimeOver = () => {
    dispatch({ type: AudiocallActionTypes.OUT_OF_TIME });
  };

  const onTimeTick = () => {
    dispatch({ type: AudiocallActionTypes.TIME_TICK });
  };

  useEffect(() => {
    audio.play();
  }, [currentQuestionIndex]);

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
          onTimeTick={onTimeTick}
          onTimeOver={onTimeOver}
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
