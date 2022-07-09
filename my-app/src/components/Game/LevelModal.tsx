import { Container, styled, Typography } from '@mui/material';
import LevelButton from './LevelButton';
import { Dispatch, SetStateAction } from 'react';
import { LEVEL_CARDS } from '../../utils/Constants';

type Props = {
  setLevel: Dispatch<SetStateAction<number | null>>;
};

const LevelModal = ({ setLevel }: Props) => {
  return (
    <>
      <StyledContainer>
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
      </StyledContainer>
    </>
  );
};

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

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  z-index: 100;
  padding: 15px;
  align-items: flex-start;
`;

export default LevelModal;
