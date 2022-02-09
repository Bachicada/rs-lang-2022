import { Box } from '@mui/material';
import React, { FC, SetStateAction } from 'react';
import { API_URL, ENDPOINTS } from '../../utils/Constants';
import LevelModal from './LevelModal';
import SprintGame from './SprintGame';

interface SprintProps {
  level?: number;
}

interface Test {
  id: string;
  image: string;
  word: string;
}

const Sprint: FC<SprintProps> = (props) => {
  const [level, setLevel] = React.useState(props.level || 0);
  const [modalOpen, setModalOpen] = React.useState(props ? true : false)
  const [test, setTest] = React.useState<Test[]>([]);

  // const fetchArr: Test[] = [];
  // for (let i = 0; i < 30; i++) {
  //   (async function () {
  //     try {
  //       const response = await fetch(`${API_URL}${ENDPOINTS.words}?page=${i}&group${level}`);
  //       if (response.ok) {
  //         const json = await response.json();
  //         fetchArr.push(json);
  //       }
  //     }
  //     catch(e) {
  //       console.log('error');
  //     }
  //   })()
  // }

  
  // fetchArr.push(fetch(`${API_URL}${ENDPOINTS.words}?page=${i}&group${level}`));
  // Promise.all(fetchArr).then((item) => {
  //   const jsonArr = item.map((item) => item.json());
  //   Promise.all(jsonArr).then((result) => {
  //   console.log('result', result);
  //     // setTest(result);
  //   })
  // });


const fetchArr = []

for (let i = 0; i < 5; i++) {
 fetchArr.push(fetch(`${API_URL}${ENDPOINTS.words}?page=${i}&group${level}`))
  
}
console.log('DONE');

Promise.all(fetchArr).then((item) => {
    const jsonArr = item.map((item) => item.json());
    Promise.all(jsonArr).then((result) => {
      console.log('result');
    })
 });
  
 fetch(`${API_URL}${ENDPOINTS.words}?page=${1}&group${level}`).then((result) => {
   console.log('result is', result);
 })

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
      <p>{test}</p>
      <SprintGame></SprintGame>
    </Box>
  );
}

export default Sprint;
