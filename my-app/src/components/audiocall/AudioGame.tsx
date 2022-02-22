import { Container } from '@mui/material'
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { updateUserWord } from '../../services/UserWordService'
import { API_URL, GAME_TYPE, WORD_STATUS } from '../../utils/Constants'
import GameScore from '../game/GameScore'
import { GameAnswers } from '../sprint/Sprint'
import SprintStars from '../sprint/SprintStars'
import { AudioWords, AudioContext } from './Audiocall'
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Button from '@mui/material/Button';

const AudioGame = () => {
  const [quizState, dispatch] = useContext(AudioContext);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false);

  useEffect(() => {
    let cleanupFunction = false;
      if (!cleanupFunction && isAnswered) {
        const updAnswer = async () => {
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
            audio: new Audio(`${API_URL}/${item.audio}`),
          }

          dispatch({ type: isAnswerCorrect ? 'CORRECT_ANSWER' : 'INCORRECT_ANSWER', payload: answer });
          setIsAnswered(false);        
        }
        updAnswer();
      }
    return () => {cleanupFunction = true};
  }, [isAnswered]);

  const obj = quizState.questions[quizState.currentQuestionIndex];
  const { item } = obj;
  const audio = new Audio(`${API_URL}/${item.audio}`);

  useEffect(() => {
    audio.play();
  }, [quizState.currentQuestionIndex]);

  return (
    <Container maxWidth="md" style={{ border: '1px solid black', borderRadius: '5px', display: 'flex', 
    alignItems: 'center', flexDirection: 'column', minHeight: '400px', justifyContent: 'space-between'}}>
      {<GameScore correctAnswersCount={quizState.correctAnswersCount} isCorrect={isAnswerCorrect} type={GAME_TYPE.AUDIOCALL}/>}
      <VolumeUpIcon style={{marginTop: '10px', width: '50px', height: '50px'}} onClick={() => {
        audio.play();
      }}/>
      <div style={{textAlign: 'center'}}>
        <h2 style={{color: '#5393E1'}}>{item.word}</h2>
      </div>
      <div>
        {
          obj.incorrect.map((word: string, id: number) => {
            return <Button variant="outlined" key={id} onClick={() => {
              if (word === item.wordTranslate) {
                setIsAnswerCorrect(true);
                setIsAnswered(true);
              } else {
                setIsAnswerCorrect(false);
                setIsAnswered(true);
              }
            }}>{word}</Button> 
          })
        }
      </div>
    </Container>
  )
}

export default AudioGame