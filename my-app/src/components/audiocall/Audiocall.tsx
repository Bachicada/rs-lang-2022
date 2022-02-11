import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { getPartOfTextbook } from '../../services/WordService';
import { WordItem } from '../../types';
import Utils from '../../utils/Utils';
import LevelModal from '../sprint/LevelModal';
import { GameAnswers } from '../sprint/Sprint';
import SprintResults from '../sprint/SprintResults';
import Timer from '../sprint/Timer';
import AudioGame from './AudioGame';

interface AudiocallProps {
  level?: number;
}

export interface AudioWords {
  item: WordItem;
  incorrect: string[];
}

let gameAnswers: GameAnswers[] = [];

const Audiocall = (props: AudiocallProps) => {
  const [level, setLevel] = useState(props.level || null);
  const [words, setWords] = React.useState<AudioWords[]>([]);
  const [wordsId, setWordsId] = React.useState(0);

  const [modalOpen, setModalOpen] = useState(props ? true : false);
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
            setWords(Utils.getAudioWords(result));
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
    <AudioGame words={words} wordsId={wordsId} setWordsId={setWordsId} 
          isGameReady={isGameReady} setIsGameFinished={setIsGameFinished}
          gameAnswers={gameAnswers}></AudioGame>
    <SprintResults isGameFinished={isGameFinished} gameAnswers={gameAnswers}></SprintResults>
  </Box>
  )
}

export default Audiocall