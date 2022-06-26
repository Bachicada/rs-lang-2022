import { useCallback, useContext, useEffect, useState } from 'react';
import { updateUserWord } from '../../services/UserWordService';
import { API_URL, GAME_TYPE, WORD_STATUS } from '../../utils/Constants';
import { QuizContext } from './Sprint';
import GameControls from '../REFACTORING/Game/GameControls';
import GameQuestion from '../REFACTORING/Game/GameQuestion';
import GameBtns from '../REFACTORING/Game/GameBtns';
import { StyledStack } from '../REFACTORING/Game/styles';
import correctAudioSrc from '../../assets/correct.mp3';
import incorrectAudioSrc from '../../assets/incorrect.mp3';

// const correctAudio = new Audio(require('../../assets/correct.mp3'));
const correctAudio = new Audio(correctAudioSrc);
// const incorrectAudio = new Audio(require('../../assets/incorrect.mp3'));
const incorrectAudio = new Audio(incorrectAudioSrc);

const SprintGame = () => {
  const [quizState, dispatch] = useContext(QuizContext);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  useEffect(() => {
    if (isAnswered) {
      const updAnswer = async () => {
        correctAudio.load();
        incorrectAudio.load();
        isAnswerCorrect ? correctAudio.play() : incorrectAudio.play();

        const item = quizState.questions[quizState.currentQuestionIndex].item;
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

        dispatch({ type: 'ADD_NEW', payload: content });
        dispatch({
          type: isAnswerCorrect ? 'CORRECT_ANSWER' : 'INCORRECT_ANSWER',
          payload: {
            item,
            answer: isAnswerCorrect,
          },
        });

        setIsAnswered(false);
      };

      updAnswer();
    }
  }, [dispatch, isAnswerCorrect, isAnswered, quizState.currentQuestionIndex, quizState.questions]);

  const question = quizState.questions[quizState.currentQuestionIndex];
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
  }, [correctClicked, incorrectClicked, quizState.currentQuestionIndex]);

  return (
    <>
      <StyledStack direction="column" spacing={2}>
        <GameControls
          audio={audio}
          correctAnswersCount={quizState.correctAnswersCount}
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

export default SprintGame;
