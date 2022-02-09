import { Box } from '@mui/material';
import React, { FC, SetStateAction, useEffect } from 'react';
import { API_URL, ENDPOINTS } from '../../utils/Constants';
import LevelModal from './LevelModal';
import SprintGame from './SprintGame';

interface SprintProps {
  level?: number;
}

interface WordsItem {
  id: string;
  image: string;
  word: string;
}

const Sprint: FC<SprintProps> = (props) => {
  const [level, setLevel] = React.useState(props.level || 0);
  const [modalOpen, setModalOpen] = React.useState(props ? true : false)
  const [words, setWords] = React.useState<WordsItem[][]>([]);

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
                console.log('result', result[0][0]);
                setWords(result);
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
