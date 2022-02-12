import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { getPartOfTextbook } from '../../services/WordService';
import { WordItem } from '../../types';
import { GAME_TYPE } from '../../utils/Constants';
import Utils from '../../utils/Utils';
import LevelModal from '../game/LevelModal';
import { GameAnswers } from '../sprint/Sprint';
import SprintResults from '../game/GameResult';
import Timer from '../game/Timer';
import AudioGame from './AudioGame';
import Game from '../game/Game';

interface AudiocallProps {
  level?: number;
}

export interface AudioWords {
  item: WordItem;
  incorrect: string[];
}

let gameAnswers: GameAnswers[] = [];

const Audiocall = (props: AudiocallProps) => {

  return (
    <Game type={GAME_TYPE.AUDIOCALL}/>
  )
}

export default Audiocall