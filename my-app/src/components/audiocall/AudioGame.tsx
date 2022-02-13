import { Container } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { API_URL } from '../../utils/Constants'
import { GameAnswers } from '../sprint/Sprint'
import { AudioWords } from './Audiocall'

interface AudioGameProps {
  words: AudioWords[];
  wordsId: number;
  setWordsId: Dispatch<SetStateAction<number>>;
  isGameReady: boolean;
  setIsGameFinished: Dispatch<SetStateAction<boolean>>;
  gameAnswers: GameAnswers[];
}

const AudioGame = (props: AudioGameProps) => {
  if (!props.isGameReady) {
    return <div>LOADING!!!!!!!!!!!!!!!</div>
  }
  if (props.wordsId >= 60) {
    return (<p>THATS ALL</p>)
  }
  const obj = props.words[props.wordsId];
  const item = obj.item;
  const audio = new Audio(`${API_URL}/${item.audio}`);
  
  return (
    <Container maxWidth="md" style={{ background: 'yellow' }}>
      <div>* * *</div>
      <button onClick={() => {
        audio.play();
      }}>Play word</button>
      <p>{item ? item.word : ''}</p>
      <div>
        {obj.incorrect.map((word, id) => {
          return <button key={props.words[id].item.id} onClick={() => {
            props.gameAnswers.push(
              word === item.wordTranslate ? {item: item, answer: true} : {item: item, answer: false}
            )
            props.setWordsId(props.wordsId + 1);  
          }}>{word}</button>
        })}
      </div>
    </Container>
  )
}

export default AudioGame