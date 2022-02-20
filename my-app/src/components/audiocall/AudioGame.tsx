import { Container } from '@mui/material'
import { Dispatch, SetStateAction, useContext, useState } from 'react'
import { API_URL } from '../../utils/Constants'
import { GameAnswers } from '../sprint/Sprint'
import SprintStars from '../sprint/SprintStars'
import { AudioWords, AudioContext } from './Audiocall'

const AudioGame = () => {
  const [quizState, dispatch] = useContext(AudioContext);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false);
  const [clickedButton, setClickedButton] = useState('');


  const obj = quizState.questions[quizState.currentQuestionIndex];
  const { item } = obj;
  const audio = new Audio(`${API_URL}/${item.audio}`);
  audio.play();
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