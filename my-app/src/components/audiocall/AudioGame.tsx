import { Container } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import { API_URL } from '../../utils/Constants'
import Utils from '../../utils/Utils'
import { GameAnswers, IWords } from '../sprint/Sprint'
import { AudioWords } from './Audiocall'

interface SprintGameProps {
  words: AudioWords[];
  wordsId: number;
  setWordsId: Dispatch<SetStateAction<number>>;
  isGameReady: boolean;
  setIsGameFinished: Dispatch<SetStateAction<boolean>>;
  gameAnswers: GameAnswers[];
}

const AudioGame = (props: SprintGameProps) => {
  if (!props.isGameReady) {
    return <div>LOADING!!!!!!!!!!!!!!!</div>
  }
  if (props.wordsId >= 60) {
    return (<p>THATS ALL</p>)
  }
  const obj = props.words[props.wordsId];
  const item = obj.item;
  const audio = new Audio(`${API_URL}/${item.audio}`);
  // const answerButtons = [...obj.incorrect];
  // const rightId = Utils.random(0,3);
  // answerButtons[rightId] = item.wordTranslate;
  
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