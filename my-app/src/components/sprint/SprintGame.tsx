import { Container } from '@mui/material'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { createUserWord, updateUserWord } from '../../services/UserWordService'
import { WordItem } from '../../types'
import { API_URL, WORD_STATUS } from '../../utils/Constants'
import { LoadingIcon } from '../shared/LoadingIcon'
import { GameAnswers, IWords } from './Sprint'
import SprintStars from './SprintStars'

interface SprintGameProps {
  words: IWords[];
  wordsId: number;
  setWordsId: Dispatch<SetStateAction<number>>;
  isGameReady: boolean;
  setIsGameFinished: Dispatch<SetStateAction<boolean>>;
  gameAnswers: GameAnswers[];
  isGameFinished: boolean;
}

interface Answer {
  item: WordItem;
  answer: boolean;
  failCounter?: number;
  successCounter?: number;
}

const SprintGame = (props: SprintGameProps) => {
  const [starsCount, setStarsCount] = useState<number>(1);

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
    <Container maxWidth="md" style={{ background: 'rgb(153, 207, 51)', borderRadius: '5px', display: 'flex', 
        alignItems: 'center', flexDirection: 'column' }}>
      <SprintStars count={starsCount} />
      <button onClick={() => {
        audio.play();
      }}>Play word</button>
      <p>{item ? item.word : ''}</p>
      <p>{obj.correct ? item.wordTranslate : obj.incorrect}</p>
      <div>
        <button onClick={() => {
          const answer: Answer = obj.correct ? {item: item, answer: false} : {item: item, answer: true}; 
          const content = updateUserWord({ wordId: `${item.id}`, word: { difficulty: WORD_STATUS.NEW, optional: { 
            failCounter: obj.correct ? 1 : 0,
            successCounter: obj.correct ? 0 : 1
           }}});
          content.then((item) => {
            answer.failCounter = item.optional.failCounter; 
            answer.successCounter = item.optional.successCounter;
          });
          props.gameAnswers.push(answer);
          setStarsCount((starsCount) => obj.correct ? 1 : (starsCount + 1));
          props.setWordsId(props.wordsId + 1);
        }}>Неверно</button>
        <button onClick={() => {
          const answer: Answer = obj.correct ? {item: item, answer: true} : {item: item, answer: false}; 
          const content = updateUserWord({ wordId: `${item.id}`, word: { difficulty: WORD_STATUS.NEW, optional: { 
            failCounter: obj.correct ? 0 : 1,
            successCounter: obj.correct ? 1 : 0
           }}});
          content.then((item) => {
            answer.failCounter = item.optional.failCounter; 
            answer.successCounter = item.optional.successCounter;
          });
          props.gameAnswers.push(answer);
          setStarsCount((starsCount) => obj.correct ? (starsCount + 1) : 1);
          props.setWordsId(props.wordsId + 1);
        }}>Верно</button>
      </div>
    </Container>
  )
}

export default SprintGame