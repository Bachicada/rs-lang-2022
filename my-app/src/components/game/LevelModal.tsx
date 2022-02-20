import { Container } from '@mui/material';
import LevelButton from './LevelButton';

const LevelModal = () => {
  const LEVELS = [1, 2, 3, 4, 5, 6];
  return (
    <Container style={{display: 'flex', 
        position: 'absolute', width: '100%', height: '100%', background: 'purple', zIndex: '100',
        alignItems: 'center'}}>
      <Container maxWidth="sm">
        <h2 style={{textAlign: 'center'}}>Выбери свой уровень</h2>
        <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'space-between', }}>
          {LEVELS.map((item, index) => <LevelButton item={item} key={index}/>)}
        </Container>
      </Container>
    </Container>
  );
};

export default LevelModal;
