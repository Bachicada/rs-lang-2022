import { Container } from '@mui/material'
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { updateUserWord } from '../../services/UserWordService'
import { API_URL, WORD_STATUS } from '../../utils/Constants'
import { GameAnswers } from '../sprint/Sprint'
import SprintStars from '../sprint/SprintStars'
import { AudioWords, AudioContext } from './Audiocall'

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
    return () => {cleanupFunction = true};
  }, [isAnswered]);

  const obj = quizState.questions[quizState.currentQuestionIndex];
  const { item } = obj;
  const audio = new Audio(`${API_URL}/${item.audio}`);

  useEffect(() => {
    audio.play();
  }, [quizState.currentQuestionIndex]);

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
      <div>
        {
          obj.incorrect.map((word: string, id: number) => {
            return <button key={id} onClick={() => {
              if (word === item.wordTranslate) {
                setIsAnswerCorrect(true);
                setIsAnswered(true);
              } else {
                setIsAnswerCorrect(false);
                setIsAnswered(true);
              }
            }}>{word}</button> 
          })
        }
        {/* {obj.incorrect.map((word, id) => {
          return <button key={props.words[id].item.id} onClick={() => {
            props.gameAnswers.push(
              word === item.wordTranslate ? {item: item, answer: true} : {item: item, answer: false}
            )
            props.setWordsId(props.wordsId + 1);  
          }}>{word}</button>
        })} */}
      </div>
    </Container>
  )
}

export default AudioGame