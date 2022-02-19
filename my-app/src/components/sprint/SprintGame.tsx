import { Container } from '@mui/material'
import { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from 'react'
import { createUserWord, updateUserWord } from '../../services/UserWordService'
import { WordItem } from '../../types'
import { API_URL, WORD_STATUS } from '../../utils/Constants'
import { LoadingIcon } from '../shared/LoadingIcon'
import { GameAnswers, IWords, QuizContext } from './Sprint'
import SprintAnswerButtons from './SprintAnswerButtons'
import SprintStars from './SprintStars'

export interface SprintGameProps {
  words: IWords[];
  wordsId: number;
  setWordsId: Dispatch<SetStateAction<number>>;
  isGameReady: boolean;
  setIsGameFinished: Dispatch<SetStateAction<boolean>>;
  gameAnswers: GameAnswers[];
  isGameFinished: boolean;
}

export interface Answer {
  item: WordItem;
  answer: boolean;
  failCounter?: number;
  successCounter?: number;
}

const SprintGame = () => {
  const [quizState, dispatch] = useContext(QuizContext);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false);
  const [clickedButton, setClickedButton] = useState('');

  useEffect(() => {
    if (isAnswered) {
      const updAnswer = async () => {
        const item = quizState.questions[quizState.currentQuestionIndex].item;
        const [failCounter, successCounter] = clickedButton === 'Неверно' 
            ? [+isAnswerCorrect, +!isAnswerCorrect]
            : [+!isAnswerCorrect, +isAnswerCorrect];
        const content = await updateUserWord({
          wordId: `${item.id}`, 
          word: { 
            difficulty: WORD_STATUS.NEW, 
            optional: {
              failCounter,
              successCounter,
            }
          }
        });
        console.log('ITEMMMMMMMMMM', content);
        const answer = {
          item,
          answer: isAnswerCorrect,
          failCounter: content.optional?.failCounter || 0,
          successCounter: content.optional?.successCounter || 0,
        }

        dispatch({ type: isAnswerCorrect ? 'CORRECT_ANSWER' : 'INCORRECT_ANSWER', payload: answer });
        setIsAnswered(false);        
      }
      updAnswer();
      console.log('ВСЕ!');
    }
  }, [isAnswered]);
  
  const obj = quizState.questions[quizState.currentQuestionIndex];
  const { item } = obj;
  const audio = new Audio(`${API_URL}/${item.audio}`);

  return (
    <Container maxWidth="md" style={{ background: 'rgb(153, 207, 51)', borderRadius: '5px', display: 'flex', 
        alignItems: 'center', flexDirection: 'column' }}>
      <SprintStars count={quizState.correctAnswersCount} />
      <button onClick={() => {
        audio.play();
      }}>
        Play word
      </button>
      <p>{item.word}</p>
      <p>{obj.correct ? item.wordTranslate : obj.incorrect}</p>
      <div>
        <button onClick={() => {
          setClickedButton('Неверно');
          setIsAnswerCorrect(!obj.correct)
          setIsAnswered(true);
        }}>
          Неверно
        </button>
        <button onClick={() => {
          console.log('TRUEEEE');
          setClickedButton('Верно');
          setIsAnswerCorrect(obj.correct)
          setIsAnswered(true);
        }}>
          Верно
        </button>
      </div>
    </Container>
  )
}

export default SprintGame