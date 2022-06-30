import { useCallback, useEffect, useState } from 'react';
import { updateUserWord } from '../../../services/UserWordService';
import { API_URL, GAME_TYPE, WORD_STATUS } from '../../../utils/Constants';
import GameControls from '../Game/GameControls';
import GameQuestion from './GameQuestion';
import GameBtns from './GameBtns';
import { StyledStack } from '../Game/styles';
import correctAudioSrc from '../../../assets/correct.mp3';
import incorrectAudioSrc from '../../../assets/incorrect.mp3';
import { useSprintContext } from '../../../store/hooks';
import { SprintActionTypes } from '../../../types/sprintTypes';

const correctAudio = new Audio(correctAudioSrc);
const incorrectAudio = new Audio(incorrectAudioSrc);

const SprintGameContent = () => {
  const [{ correctAnswersCount, questions, currentQuestionIndex }, dispatch] = useSprintContext();

  const [isAnswered, setIsAnswered] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  useEffect(() => {
    if (isAnswered) {
      const updAnswer = async () => {
        correctAudio.load();
        incorrectAudio.load();
        isAnswerCorrect ? correctAudio.play() : incorrectAudio.play();

        const item = questions[currentQuestionIndex].item;
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
        dispatch({
          type: isAnswerCorrect
            ? SprintActionTypes.CORRECT_ANSWER
            : SprintActionTypes.INCORRECT_ANSWER,
          payload: {
            item,
            answer: isAnswerCorrect,
          },
        });

        setIsAnswered(false);
      };

      updAnswer();
    }
  }, [currentQuestionIndex, dispatch, isAnswerCorrect, isAnswered, questions]);
  // }, [dispatch, isAnswerCorrect, isAnswered, quizState.currentQuestionIndex, quizState.questions]);

  const question = questions[currentQuestionIndex];
  const { item } = question;
  const audio = new Audio(`${API_URL}/${item.audio}`);

  const correctClicked = useCallback(() => {
    setIsAnswerCorrect(question.correct ? true : false);
    setIsAnswered(true);
  }, [question.correct]);

  const incorrectClicked = useCallback(() => {
    setIsAnswerCorrect(question.correct ? false : true);
    setIsAnswered(true);
  }, [question.correct]);

  useEffect(() => {
    const keyDown = (ev: KeyboardEvent) => {
      if (ev.key === 'ArrowRight') {
        correctClicked();
      }
      if (ev.key === 'ArrowLeft') {
        incorrectClicked();
      }
    };
    document.addEventListener('keydown', keyDown);
    return () => {
      document.removeEventListener('keydown', keyDown);
    };
  }, [correctClicked, incorrectClicked]);
  // }, [correctClicked, incorrectClicked, quizState.currentQuestionIndex]);

  return (
    <>
      <StyledStack direction="column" spacing={2}>
        <GameControls
          audio={audio}
          correctAnswersCount={correctAnswersCount}
          isCorrect={isAnswerCorrect}
          type={GAME_TYPE.SPRINT}
        />

        <GameQuestion question={question} item={item} />

        <GameBtns
          question={question}
          setIsAnswered={setIsAnswered}
          setIsAnswerCorrect={setIsAnswerCorrect}
        />
      </StyledStack>
    </>
  );
};

export default SprintGameContent;
