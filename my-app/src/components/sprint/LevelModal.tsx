import { Box, Container } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import LevelButton from './LevelButton';

export interface ModalProps {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  setLevel: Dispatch<SetStateAction<number | null>>;
}


const LevelModal = (props: ModalProps) => {
  const LEVELS = [1, 2, 3, 4, 5, 6];
  return (
    <Container maxWidth="sm" style={{display: props.active ? 'block' : 'none', 
        position: 'absolute', left: 'calc(50% - 300px)'}}>
      <h2 style={{textAlign: 'center'}}>Выбери свой уровень</h2>
      <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'space-between', }}>
        {LEVELS.map((item, index) => <LevelButton item={item} props={props} key={index}/>)}
      </Container>
    </Container>
  );
};

export default LevelModal;
