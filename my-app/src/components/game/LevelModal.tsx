import { Container, Typography } from '@mui/material';
import LevelButton from './LevelButton';

const LevelModal = () => {
  const LEVELS = [1, 2, 3, 4, 5, 6];
  return (
    <>
      <Container
        style={{
          display: 'flex',
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: '100',
          padding: '15px',
          alignItems: 'center',
        }}
      >
        <Container
          maxWidth="sm"
          style={{
            border: '1px solid black',
            borderRadius: '15px',
            padding: '10px',
            boxShadow:
              '0 1px 2px 0 rgb(0 0 0 / 25%), 0 2px 4px 1px rgb(0 0 0 / 20%), 0 4px 8px 2px rgb(0 0 0 / 15%), 0 8px 16px 4px rgb(0 0 0 / 10%)',
          }}
        >
          <h2 style={{ textAlign: 'center' }}>Выбери свой уровень</h2>
          <Typography>Выбери свой уровень: </Typography>
          <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {LEVELS.map((item, index) => (
              <LevelButton item={item} key={index} />
            ))}
          </Container>
        </Container>
      </Container>
    </>
  );
};

export default LevelModal;
