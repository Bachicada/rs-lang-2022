import { Box } from '@mui/material';
import React, { FC, SetStateAction, useEffect } from 'react';
import { API_URL, ENDPOINTS } from '../../utils/Constants';
import LevelModal from './LevelModal';
import SprintGame from './SprintGame';

interface SprintProps {
  level?: number;
}

interface WordsItem {
  audio: string;
  audioExample: string;
  audioMeaning: string;
  group: number;
  id: string;
  image: string;
  page: number;
  textExample: string;
  textExampleTranslate: string;
  textMeaning: string;
  textMeaningTranslate: string;
  transcription: string;
  word: string;
  wordTranslate: string;
}

interface IWords {
  item: WordsItem;
  correct: boolean;
  incorrect: string;
}

const random = (min: number, max: number) => {
  return min + Math.floor(Math.random() * (max - min + 1));
}

const getRandomWords = (arr: WordsItem[][]) => {
  const idxArr: number[] = [];
  for (let i = 0; i < 3; i++) {
    if (i === 0) idxArr.push(random(0, 29));
    else {
      let rand = random(0, 29);
      while (rand === idxArr[i - 1]) {
        rand = random(0, 29);
      }
      idxArr.push(rand);
    }
  }
  const piece = idxArr.map((id) => {
    return arr[id]
  }).flat();

  const result = piece.map((item) => {
    return {
      item: item,
      correct: random(0,1) === 1 ? true: false,
      incorrect: piece[random(0, 29)].wordTranslate
    }
  });
  
  return result;
}

const Sprint: FC<SprintProps> = (props) => {
  const [level, setLevel] = React.useState(props.level || 0);
  const [modalOpen, setModalOpen] = React.useState(props ? true : false)
  const [words, setWords] = React.useState<IWords[]>([]);

  useEffect(() => {
    const fetchArr = []

    for (let i = 0; i < 30; i++) {
      fetchArr.push(fetch(`${API_URL}${ENDPOINTS.words}?page=${i}&group=${level}`));
    }


    Promise.all(fetchArr)
        .then((item) => {
          const jsonArr = item.map((item) => item.json());
          Promise.all(jsonArr)
              .then((result) => {
                setWords(getRandomWords(result));
              })
        });

  }, [level])

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
      <SprintGame></SprintGame>
    </Box>
  );
}

export default Sprint;
