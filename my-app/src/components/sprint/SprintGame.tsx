import { Container } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { updateUserWord } from '../../services/UserWordService'
import { API_URL, WORD_STATUS } from '../../utils/Constants'
import GameScore from '../game/GameScore'
import { QuizContext } from './Sprint'
import SprintStars from './SprintStars'
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Button from '@mui/material/Button';

const SprintGame = () => {
  const [quizState, dispatch] = useContext(QuizContext);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  useEffect(() => {
    if (isAnswered) {
      const updAnswer = async () => {
        const audio = isAnswerCorrect 
            ? new Audio(require('../../assets/correct.mp3'))
            : new Audio(require('../../assets/incorrect.mp3'))
        audio.play();
        const item = quizState.questions[quizState.currentQuestionIndex].item;
        const [failCounter, successCounter] = [+!isAnswerCorrect, +isAnswerCorrect];
        const content = updateUserWord({
          wordId: `${item.id}`, 
          word: { 
            difficulty: WORD_STATUS.NEW, 
            optional: {
              failCounter,
              successCounter,
            }
          }
        });
        dispatch({ type: 'ADD_NEW', payload: content });
        const answer = {
          item,
          answer: isAnswerCorrect,
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

  const correctClicked = () => {
    setIsAnswerCorrect(obj.correct ? true : false);
    setIsAnswered(true);
  }
  const notCorrectClicked = () => {
    setIsAnswerCorrect(obj.correct ? false : true);
    setIsAnswered(true);
  }

  useEffect(() => {
    const keyDown = (ev:KeyboardEvent) => {
      if (ev.key === 'ArrowRight') {
        correctClicked();
      }
      if (ev.key === 'ArrowLeft') {
        notCorrectClicked()
      }
    };
    document.addEventListener('keydown', keyDown);
    return () =>{
      document.removeEventListener('keydown', keyDown);
    }
  }, [quizState.currentQuestionIndex]);

  return (
    <Container maxWidth="md" style={{ border: '1px solid black', borderRadius: '5px', display: 'flex', 
        alignItems: 'center', flexDirection: 'column', minHeight: '400px', justifyContent: 'space-between'}}>
      {<GameScore correctAnswersCount={quizState.correctAnswersCount} isCorrect={isAnswerCorrect}/>}
      <VolumeUpIcon style={{marginTop: '10px', width: '50px', height: '50px'}} onClick={() => {
        audio.play();
      }}/>
      <div style={{textAlign: 'center'}}>
        <h2 style={{color: '#5393E1'}}>{item.word}</h2>
        <h2>{obj.correct ? item.wordTranslate : obj.incorrect}</h2>
      </div>
      <div>
      <Button variant="outlined" color="error" style={{width: '200px', height: '70px'}} onClick={() => {
          setIsAnswerCorrect(obj.correct ? false : true);
          setIsAnswered(true);
        }}>
          Неверно
        </Button>
        <Button variant="outlined" color="success" style={{width: '200px', height: '70px'}} onClick={() => {
          setIsAnswerCorrect(obj.correct ? true : false);
          setIsAnswered(true);
        }}>
          Верно
        </Button>
        {/* <button onClick={() => {
          setIsAnswerCorrect(obj.correct ? false : true);
          setIsAnswered(true);
        }}>
          Неверно
        </button>
        <button onClick={() => {
          setIsAnswerCorrect(obj.correct ? true : false);
          setIsAnswered(true);
        }}>
          Верно
        </button> */}
      </div>
    </Container>
  )
}

export default SprintGame