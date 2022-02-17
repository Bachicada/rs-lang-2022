import { Container } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import LevelButton from './LevelButton';

export interface ModalProps {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  setLevel: Dispatch<SetStateAction<number | null>>;
}

const LevelModal = (props: ModalProps) => {
  const LEVELS = [1, 2, 3, 4, 5, 6];
  return (
    <Container style={{display: props.active ? 'flex' : 'none', 
        position: 'absolute', width: '100%', height: '100%', background: 'purple', zIndex: '100',
        alignItems: 'center'}}>
      <Container maxWidth="sm">
        <h2 style={{textAlign: 'center'}}>Выбери свой уровень</h2>
        <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'space-between', }}>
          {LEVELS.map((item, index) => <LevelButton item={item} props={props} key={index}/>)}
        </Container>
      </Container>
    </Container>
  );
};

export default LevelModal;
