import { Container } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { API_URL } from '../../utils/Constants'
import { LoadingIcon } from '../shared/LoadingIcon'
import { GameAnswers, IWords } from './Sprint'

interface SprintGameProps {
  words: IWords[];
  wordsId: number;
  setWordsId: Dispatch<SetStateAction<number>>;
  isGameReady: boolean;
  setIsGameFinished: Dispatch<SetStateAction<boolean>>;
  gameAnswers: GameAnswers[];
  isGameFinished: boolean;
}

const SprintGame = (props: SprintGameProps) => {
  if (!props.isGameReady) {
    return (
    <div style={{position: 'absolute', zIndex: '50', width: 'auto', height: 'auto', 
        left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
      <LoadingIcon />
    </div>
    )
  }
  if (props.wordsId >= 60 || props.isGameFinished) {
    return (<p>THATS ALL</p>)
  }
  const obj = props.words[props.wordsId];
  const item = obj.item;
  const audio = new Audio(`${API_URL}/${item.audio}`);

  return (
    <Container maxWidth="md" style={{ background: 'rgb(153, 207, 51)', borderRadius: '5px' }}>
      <div>* * *</div>
      <button onClick={() => {
        audio.play();
      }}>Play word</button>
      <p>{item ? item.word : ''}</p>
      <p>{obj.correct ? item.wordTranslate : obj.incorrect}</p>
      <div>
        <button onClick={() => {
          props.gameAnswers.push(
            obj.correct ? {item: item, answer: false} : {item: item, answer: true}
          );
          props.setWordsId(props.wordsId + 1);
        }}>Неверно</button>
        <button onClick={() => {
          props.gameAnswers.push(
            obj.correct ? {item: item, answer: true} : {item: item, answer: false}
          );
          props.setWordsId(props.wordsId + 1);
        }}>Верно</button>
      </div>
    </Container>
  )
}

export default SprintGame