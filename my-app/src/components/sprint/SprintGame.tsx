import { Container } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import { API_URL } from '../../utils/Constants'
import { IWords } from './Sprint'

interface SprintGameProps {
  words: IWords[];
  wordsId: number;
  setWordsId: Dispatch<SetStateAction<number>>;
  isGameReady: boolean;
}

const SprintGame = (props: SprintGameProps) => {
  if (!props.isGameReady) {
    return <div>LOADING!!!!!!!!!!!!!!!</div>
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
      <p>{obj.correct ? item.wordTranslate : obj.incorrect}</p>
      <div>
        <button onClick={() => {
          obj.correct ? alert('wrong') : alert('right!');
          props.setWordsId(props.wordsId + 1);
        }}>Неверно</button>
        <button onClick={() => {
          obj.correct ? alert('right!') : alert('wrong');
          props.setWordsId(props.wordsId + 1);
        }}>Верно</button>
      </div>
    </Container>
  )
}

export default SprintGame