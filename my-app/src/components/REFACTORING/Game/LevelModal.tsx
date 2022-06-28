import { Container, styled, Typography } from '@mui/material';
import LevelButton from './LevelButton';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { SprintReducerAction, SprintActionTypes } from '../../../types/sprintTypes';
import { AudiocallReducerAction } from '../../../types/audiocallTypes';
import { getPartOfTextbook } from '../../../services/WordService';
import Utils from '../../../utils/Utils';
import { LEVEL_CARDS } from '../../../utils/Constants';

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
  setLevel: Dispatch<SetStateAction<number | null>>;
  // dispatch: Dispatch<SprintReducerAction>;
};

const LevelModal = ({ setLevel }: Props) => {
  // useEffect(() => {
  //   if (level || level === 0) {
  //     const fetchData = async () => {
  //       dispatch({ type: SprintActionTypes.LOADING });
  //       try {
  //         const data = [
  //           await getPartOfTextbook(`${Utils.random(0, 29)}`, `${level}`),
  //           await getPartOfTextbook(`${Utils.random(0, 29)}`, `${level}`),
  //           await getPartOfTextbook(`${Utils.random(0, 29)}`, `${level}`),
  //         ];
  //         const result = Utils.getRandomWords(data);
  //         dispatch({ type: SprintActionTypes.CHANGE_LEVEL, payload: { result, level } });
  //       } catch (err) {
  //         alert('Oops! Something goes wrong.');
  //       }
  //     };

  //     fetchData();
  //   }
  // }, [dispatch, level]);

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
          {LEVEL_CARDS.map((item, index) => (
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
