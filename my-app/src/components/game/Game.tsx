import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { getPartOfTextbook } from '../../services/WordService';
import { GAME_TYPE } from '../../utils/Constants';
import Utils from '../../utils/Utils';
import LevelModal from './LevelModal';
import { GameAnswers, IWords } from '../sprint/Sprint';
import SprintGame from '../sprint/SprintGame';
import GameResult from './GameResult';
import Timer from './Timer';
import { AudioWords } from '../audiocall/Audiocall';
import AudioGame from '../audiocall/AudioGame';

interface GameProps {
  level?: number;
  type: GAME_TYPE;
}

let gameAnswers: GameAnswers[] = [];

const Game = (props: GameProps) => {
  const [level, setLevel] = useState(props.level || null);
  const [words, setWords] = React.useState<AudioWords[] | IWords[]>([]);
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
            if (props.type === GAME_TYPE.AUDIOCALL) setWords(Utils.getAudioWords(result));
            else if (props.type === GAME_TYPE.SPRINT) setWords(Utils.getRandomWords(result));
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
      justifyContent: 'center',
      position: 'relative',
    }}
  >
    <LevelModal active={modalOpen} setActive={setModalOpen} setLevel={setLevel}></LevelModal>
    <div style={{width: '700px', height: 'auto', display: 'flex', justifyContent: 'center', position: 'relative'}}>
      <Timer time={seconds} setTimerActive={setTimerActive} isGameReady={isGameReady}></Timer>
      {props.type === GAME_TYPE.AUDIOCALL ? <AudioGame words={words as AudioWords[]} wordsId={wordsId} setWordsId={setWordsId} 
            isGameReady={isGameReady} setIsGameFinished={setIsGameFinished}
            gameAnswers={gameAnswers}></AudioGame> : ''}
      {props.type === GAME_TYPE.SPRINT ? <SprintGame words={words as IWords[]} wordsId={wordsId} setWordsId={setWordsId} 
            isGameReady={isGameReady} setIsGameFinished={setIsGameFinished} isGameFinished={isGameFinished}
            gameAnswers={gameAnswers}></SprintGame> : ''}
      <GameResult isGameFinished={isGameFinished} gameAnswers={gameAnswers} type={props.type}></GameResult>
    </div>
  </Box>
  )
}

export default Game