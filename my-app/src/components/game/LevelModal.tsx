import { Container, styled, Typography } from '@mui/material';
import LevelButton from './LevelButton';
import imgHappy from '../../assets/illustrations/manHappy.png';
import imgIdea from '../../assets/illustrations/manIdea.png';
import imgLaptop from '../../assets/illustrations/manLaptop.png';
import imgHurry from '../../assets/illustrations/womanHurry.png';
import imgPuzzle from '../../assets/illustrations/womanPuzzle.png';
import imgTablet from '../../assets/illustrations/womanTablet.png';
import { Dispatch, useEffect, useState } from 'react';
import { ReducerAction, SprintActionTypes } from '../../types/sprintTypes';
import { getPartOfTextbook } from '../../services/WordService';
import Utils from '../../utils/Utils';

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

const FlexContainer = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fit, 200px);
  grid-gap: 20px;
  justify-content: space-around;
  justify-items: center;
  width: 100%;

  @media (min-width: 600px) {
    grid-template-columns: repeat(auto-fit, 250px);
  }

  @media (min-width: 992px) {
    grid-template-columns: repeat(auto-fit, 300px);
  }
`;

type Props = {
  dispatch: Dispatch<ReducerAction>;
};

const LevelModal = ({ dispatch }: Props) => {
  const [level, setLevel] = useState<number>();

  useEffect(() => {
    if (level || level === 0) {
      const fetchData = async () => {
        dispatch({ type: SprintActionTypes.LOADING });
        try {
          const data = [
            await getPartOfTextbook(`${Utils.random(0, 29)}`, `${level}`),
            await getPartOfTextbook(`${Utils.random(0, 29)}`, `${level}`),
            await getPartOfTextbook(`${Utils.random(0, 29)}`, `${level}`),
          ];
          const result = Utils.getRandomWords(data);
          dispatch({ type: SprintActionTypes.CHANGE_LEVEL, payload: { result, level } });
        } catch (err) {
          alert('Oops! Something goes wrong.');
        }
      };

      fetchData();
    }
  }, [dispatch, level]);

  return (
    <>
      <Container
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          zIndex: '100',
          padding: '15px',
          alignItems: 'flex-start',
        }}
      >
        <Typography sx={{ marginBottom: '30px' }} textAlign="center" variant="h3" component="h2">
          Выбери уровень
        </Typography>

        <FlexContainer>
          {ARR.map((item, index) => (
            <LevelButton
              key={index}
              item={item.level}
              name={item.name}
              content={item}
              setLevel={setLevel}
            />
          ))}
        </FlexContainer>
      </Container>
    </>
  );
};

export default LevelModal;
