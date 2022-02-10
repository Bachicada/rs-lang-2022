import { Box } from '@mui/material';
import React, { FC, useEffect } from 'react';
import { getPartOfTextbook } from '../../services/WordService';
import { WordItem } from '../../types';
import Utils from '../../utils/Utils';
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
  const [level, setLevel] = React.useState(props.level || null);
  const [words, setWords] = React.useState<IWords[]>([]);
  const [wordsId, setWordsId] = React.useState(0);
  
  const [modalOpen, setModalOpen] = React.useState(props ? true : false)
  const [isGameReady, setIsGameReady] = React.useState(false);
  const [ isGameFinished, setIsGameFinished ] = React.useState(false);

  const [ seconds, setSeconds ] = React.useState(60);
  const [ timerActive, setTimerActive ] = React.useState(false);


  useEffect(() => {
    if (seconds > 0 && timerActive && !isGameFinished) {
      setTimeout(setSeconds, 1000, seconds - 1);
    } else {
      setTimerActive(false);
    }
  }, [ seconds, timerActive, isGameFinished ]);

  useEffect(() => {
    if (wordsId >= 60 || seconds === 0) {
      setIsGameFinished(true);
    }
  }, [ wordsId, seconds ]);

  useEffect(() => {
    if (level !== null) {
      const fetchArr = []

      for (let i = 0; i < 30; i++) {
        fetchArr.push(getPartOfTextbook(`${i}`, `${level}`));
      }
    
      Promise.all(fetchArr)
          .then((result) => {
            setWords(Utils.getRandomWords(result));
            setIsGameReady(true);
            setTimerActive(true);
          });
    }
  }, [level]);
  
  return (
    <Box
      sx={{
        width: '100%',
        height: 'calc(100vh - 64px - 25px - 48px)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <LevelModal active={modalOpen} setActive={setModalOpen} setLevel={setLevel}></LevelModal>
      <Timer time={seconds} setTimerActive={setTimerActive} isGameReady={isGameReady}></Timer>
      <SprintGame words={words} wordsId={wordsId} setWordsId={setWordsId} 
          isGameReady={isGameReady} setIsGameFinished={setIsGameFinished}
          gameAnswers={gameAnswers}></SprintGame>
      <SprintResults isGameFinished={isGameFinished} gameAnswers={gameAnswers}></SprintResults>
    </Box>
  );
}

export default Sprint;
