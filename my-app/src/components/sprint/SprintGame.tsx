import { Container } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { updateUserWord } from '../../services/UserWordService'
import { API_URL, WORD_STATUS } from '../../utils/Constants'
import GameScore from '../game/GameScore'
import { QuizContext } from './Sprint'
import SprintStars from './SprintStars'


const SprintGame = () => {
  const [quizState, dispatch] = useContext(QuizContext);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false);
  const [clickedButton, setClickedButton] = useState('');
  const [test, setTest] = useState(false);

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
    }
  }, [isAnswered]);
  
  const obj = quizState.questions[quizState.currentQuestionIndex];
  const { item } = obj;
  const audio = new Audio(`${API_URL}/${item.audio}`);

  let setAnswer = (bool: boolean) => {
    const obj = quizState.questions[quizState.currentQuestionIndex];
    if (bool) {
      setClickedButton('Верно');
      setIsAnswerCorrect(obj.correct)
      setTest(obj.correct ? true : false);
      setIsAnswered(true);
    }
    else {
      setClickedButton('Неверно');
      setIsAnswerCorrect(!obj.correct);
      setTest(obj.correct ? false : true);
      setIsAnswered(true);
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', (ev) => {
      if (ev.key === 'ArrowRight') {
        setAnswer(true);
      }
      if (ev.key === 'ArrowLeft') {
        setAnswer(false);
      }
    })
  }, []);

  return (
    <Container maxWidth="md" style={{ background: 'rgb(153, 207, 51)', borderRadius: '5px', display: 'flex', 
        alignItems: 'center', flexDirection: 'column' }}>
      {/* <SprintStars count={quizState.correctAnswersCount} /> */}
      {isAnswered &&
          <GameScore correctAnswersCount={quizState.correctAnswersCount} isCorrect={test}/>}
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
          setIsAnswerCorrect(!obj.correct);
          setTest(obj.correct ? false : true);
          setIsAnswered(true);
        }}>
          Неверно
        </button>
        <button onClick={() => {
          setClickedButton('Верно');
          setIsAnswerCorrect(obj.correct);
          setTest(obj.correct ? true : false);
          setIsAnswered(true);
        }}>
          Верно
        </button>
      </div>
    </Container>
  )
}

export default SprintGame