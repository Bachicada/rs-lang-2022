import { Box } from '@mui/material';
import React, { FC, useEffect } from 'react';
import { getPartOfTextbook } from '../../services/WordService';
import { WordItem } from '../../types';
import { GAME_TYPE } from '../../utils/Constants';
import Utils from '../../utils/Utils';
import Game from '../audiocall/Game';
import LevelModal from './LevelModal';
import SprintGame from './SprintGame';
import SprintResults from './SprintResults';
import Timer from './Timer';

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

let gameAnswers: GameAnswers[] = [];

const Sprint: FC<SprintProps> = (props) => {
  
  return (
    <Game type={GAME_TYPE.SPRINT}/>
  );
}

export default Sprint;
