import { Box, Container, Grid, Typography } from '@mui/material';
import LevelButton from './LevelButton';
import imgHappy from '../../assets/illustrations/manHappy.png';
import imgIdea from '../../assets/illustrations/manIdea.png';
import imgLaptop from '../../assets/illustrations/manLaptop.png';
import imgHurry from '../../assets/illustrations/womanHurry.png';
import imgPuzzle from '../../assets/illustrations/womanPuzzle.png';
import imgTablet from '../../assets/illustrations/womanTablet.png';

const ARR = [
  {
    level: 1,
    name: 'Elementary',
    img: imgHappy,
  },
  {
    level: 2,
    name: 'Pre Intermediate',
    img: imgTablet,
  },
  {
    level: 3,
    name: 'Intermediate',
    img: imgPuzzle,
  },
  {
    level: 4,
    name: 'Upper Intermediate',
    img: imgLaptop,
  },
  {
    level: 5,
    name: 'Advanced',
    img: imgHurry,
  },
  {
    level: 6,
    name: 'Proficient',
    img: imgIdea,
  },
];
// const ARR = [
//   {
//     level: 1,
//     name: 'A1',
//     img: imgHappy,
//   },
//   {
//     level: 2,
//     name: 'A2',
//     img: imgTablet,
//   },
//   {
//     level: 3,
//     name: 'B1',
//     img: imgPuzzle,
//   },
//   {
//     level: 4,
//     name: 'B2',
//     img: imgLaptop,
//   },
//   {
//     level: 5,
//     name: 'C1',
//     img: imgHurry,
//   },
//   {
//     level: 6,
//     name: 'C2',
//     img: imgIdea,
//   },
// ];

const LevelModal = () => {
  const LEVELS = [1, 2, 3, 4, 5, 6];
  const NAMES = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  // const NAMES = ['Elem', 'Elem', 'Elem', 'Upper Intermediate', 'Hard', 'Hard'];

  return (
    <>
      <Container
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: '100',
          padding: '15px',
          alignItems: 'flex-start',
        }}
      >
        {/* <h2 style={{ textAlign: 'center' }}>Выбери свой уровень</h2> */}
        <Typography sx={{ marginBottom: '30px' }} textAlign="center" variant="h3" component="h2">
          Выбери уровень
        </Typography>

        <Grid container spacing={2}>
          {ARR.map((item, index) => (
            <Grid item key={index} xs={6} sm={6} md={4}>
              <LevelButton item={item.level} name={item.name} content={item} />
            </Grid>
          ))}
          {/* {LEVELS.map((item, index) => (
            <Grid item key={index} xs={4}>
              <LevelButton item={item} name={NAMES[index]} />
            </Grid>
          ))} */}
        </Grid>
        {/* <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {LEVELS.map((item, index) => (
            <LevelButton item={item} key={index} />
          ))}
        </Box> */}
      </Container>
    </>
  );
};

export default LevelModal;
