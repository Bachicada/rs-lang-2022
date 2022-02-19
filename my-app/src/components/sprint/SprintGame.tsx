import { Container } from '@mui/material'
import { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from 'react'
import { createUserWord, updateUserWord } from '../../services/UserWordService'
import { WordItem } from '../../types'
import { API_URL, WORD_STATUS } from '../../utils/Constants'
import { LoadingIcon } from '../shared/LoadingIcon'
import { GameAnswers, IWords, QuizContext } from './Sprint'
import SprintAnswerButtons from './SprintAnswerButtons'
import SprintStars from './SprintStars'

export interface SprintGameProps {
  words: IWords[];
  wordsId: number;
  setWordsId: Dispatch<SetStateAction<number>>;
  isGameReady: boolean;
  setIsGameFinished: Dispatch<SetStateAction<boolean>>;
  gameAnswers: GameAnswers[];
  isGameFinished: boolean;
}

export interface Answer {
  item: WordItem;
  answer: boolean;
  failCounter?: number;
  successCounter?: number;
}

function keyEv(ev: KeyboardEvent, props: SprintGameProps) {
  if (ev.key === 'ArrowLeft') {
    console.log('props.wordsId LEFT')
    console.log(props.wordsId);
  }
  else if (ev.key === 'ArrowRight') {
    console.log('props.wordsId RIGHT');
    console.log(props.wordsId);
  }
}

const SprintGame = (props: SprintGameProps) => {
  const [starsCount, setStarsCount] = useState<number>(1);
  const [isReadyEv, setIsReadyEv] = useState(false);
  const [quizState, dispatch] = useContext(QuizContext);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false);

  useEffect(() => {
    if (isAnswered) {
      const updAnswer = async () => {
        const item = quizState.questions[quizState.currentQuestionIndex].item;
        const [failCounter, successCounter] = [+isAnswerCorrect, +!isAnswerCorrect];
        const content = await updateUserWord({
          wordId: `${item.id}`, 
          word: { 
            difficulty: WORD_STATUS.NEW, 
            optional: { 
              // failCounter: +isAnswerCorrect,
              // successCounter: +!isAnswerCorrect,
              failCounter,
              successCounter,
            }
          }
        });
        console.log('ITEMMMMMMMMMM', content);
        const answer = {
          item,
          answer: isAnswerCorrect,
          failCounter: content.optional.failCounter,
          successCounter: content.optional.successCounter,
        }

        dispatch({ type: isAnswerCorrect ? 'CORRECT_ANSWER' : 'INCORRECT_ANSWER', payload: answer })        
      }
      updAnswer();
    }
  }, [isAnswered]);

  useEffect(() => {
    if (props.isGameReady) {
      setIsReadyEv(true);
    }
  }, [props.isGameReady]);

  useEffect(() => {
    if (isReadyEv) {
      document.addEventListener('keydown', (ev) => {
        keyEv(ev, props);
      });
    }
    return () => document.removeEventListener('keydown', (ev) => { keyEv(ev, props); })
  }, [isReadyEv, props.wordsId]);

  // if (!props.isGameReady) {
  //   return (
  //   <div style={{position: 'absolute', zIndex: '50', width: 'auto', height: 'auto', 
  //       left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
  //     <LoadingIcon />
  //   </div>
  //   )
  // }
  if (props.wordsId >= 60 || props.isGameFinished) {
    return (<p>THATS ALL</p>)
  }
  // const obj = props.words[props.wordsId];
  // const item = obj.item;
  // const audio = new Audio(`${API_URL}/${item.audio}`);
  const obj = quizState.questions[quizState.currentQuestionIndex];
  const { item } = obj;
  const audio = new Audio(`${API_URL}/${item.audio}`);
  return (
    <Container maxWidth="md" style={{ background: 'rgb(153, 207, 51)', borderRadius: '5px', display: 'flex', 
        alignItems: 'center', flexDirection: 'column' }}>
      <SprintStars count={starsCount} />
      <button onClick={() => {
        audio.play();
      }}>Play word</button>
      {item && <p>{item.word}</p>}
      <p>{obj.correct ? item.wordTranslate : obj.incorrect}</p>
      <div>
      <button onClick={() => {
        // obj.correct ? dispatch({ type: 'INCORRECT_ANSWER', payload: item }) : dispatch({ type: 'CORRECT_ANSWER', payload: item })
        setIsAnswerCorrect(!obj.correct)
        setIsAnswered(true);
          // const answer: Answer = obj.correct ? {item: item, answer: false} : {item: item, answer: true}; 
          // const content = updateUserWord({ wordId: `${item.id}`, word: { difficulty: WORD_STATUS.NEW, optional: { 
          //   failCounter: obj.correct ? 1 : 0,
          //   successCounter: obj.correct ? 0 : 1
          //  }}});
          // content.then((item) => {
          //   answer.failCounter = item.optional.failCounter; 
          //   answer.successCounter = item.optional.successCounter;
          // });
          // props.gameAnswers.push(answer);
          // setStarsCount((starsCount) => obj.correct ? 1 : (starsCount + 1));
          // props.setWordsId(props.wordsId + 1);
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