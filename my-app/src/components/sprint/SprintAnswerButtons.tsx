import React, { Dispatch, FC, SetStateAction } from 'react';
import { updateUserWord } from '../../services/UserWordService';
import { WordItem } from '../../types';
import { WORD_STATUS } from '../../utils/Constants';
import { GameAnswers, IWords } from './Sprint';
import { Answer, SprintGameProps } from './SprintGame';

interface SprintAnswerButtonsProps {
  obj: IWords;
  item: WordItem;
  props: SprintGameProps;
  setStarsCount: Dispatch<SetStateAction<number>>;
}

const SprintAnswerButtons: FC<SprintAnswerButtonsProps> = ({obj, item, props, setStarsCount}) => {
  return (
    <><button onClick={() => {
      const answer: Answer = obj.correct ? { item: item, answer: false } : { item: item, answer: true };
      const content = updateUserWord({
        wordId: `${item.id}`, word: {
          difficulty: WORD_STATUS.NEW, optional: {
            failCounter: obj.correct ? 1 : 0,
            successCounter: obj.correct ? 0 : 1
          }
        }
      });
      content.then((item) => {
        answer.failCounter = item.optional.failCounter;
        answer.successCounter = item.optional.successCounter;
      });
      props.gameAnswers.push(answer);
      setStarsCount((starsCount) => obj.correct ? 1 : (starsCount + 1));
      props.setWordsId(props.wordsId + 1);
    } }>Неверно</button><button onClick={() => {
      const answer: Answer = obj.correct ? { item: item, answer: true } : { item: item, answer: false };
      const content = updateUserWord({
        wordId: `${item.id}`, word: {
          difficulty: WORD_STATUS.NEW, optional: {
            failCounter: obj.correct ? 0 : 1,
            successCounter: obj.correct ? 1 : 0
          }
        }
      });
      content.then((item) => {
        answer.failCounter = item.optional.failCounter;
        answer.successCounter = item.optional.successCounter;
      });
      props.gameAnswers.push(answer);
      setStarsCount((starsCount) => obj.correct ? (starsCount + 1) : 1);
      props.setWordsId(props.wordsId + 1);
    } }>Верно</button></>
  );
}

export default SprintAnswerButtons
