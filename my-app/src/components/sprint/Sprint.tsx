import { FC } from 'react';
import { WordItem } from '../../types';
import { GAME_TYPE } from '../../utils/Constants';
import Game from '../game/Game';

export interface SprintProps {
  level?: number;
}

export interface GameAnswers {
  item: WordItem;
  answer: boolean;
}

export interface IWords {
  item: WordItem;
  correct: boolean;
  incorrect: string;
}

const Sprint: FC<SprintProps> = (props) => {
  
  return (
    <Game type={GAME_TYPE.SPRINT}/>
  );
}

export default Sprint;
