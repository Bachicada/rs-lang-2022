import { Container } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { createUserWord, updateUserWord } from '../../services/UserWordService'
import { API_URL, WORD_STATUS } from '../../utils/Constants'
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
    <Container maxWidth="md" style={{ background: 'rgb(153, 207, 51)', borderRadius: '5px', display: 'flex', 
        alignItems: 'center', flexDirection: 'column' }}>
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
          updateUserWord({ wordId: `${item.id}`, word: { difficulty: WORD_STATUS.NEW, optional: { 
            failCounter: obj.correct ? 1 : 0,
            successCounter: obj.correct ? 0 : 1
           }}})
          props.setWordsId(props.wordsId + 1);
        }}>Неверно</button>
        <button onClick={() => {
          props.gameAnswers.push(
            obj.correct ? {item: item, answer: true} : {item: item, answer: false}
          );
          updateUserWord({ wordId: `${item.id}`, word: { difficulty: WORD_STATUS.NEW, optional: { 
            failCounter: obj.correct ? 0 : 1,
            successCounter: obj.correct ? 1 : 0
           }}})
          props.setWordsId(props.wordsId + 1);
        }}>Верно</button>
      </div>
    </Container>
  )
}

export default SprintGame