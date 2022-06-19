import * as React from 'react';
import styles from './landing.module.css';
import textbookIcon from '../../assets/textbookIcon1.svg';
import sprintIcon from '../../assets/sprintIcon.svg';
import audioIcon from '../../assets/audioIcon.svg';
import statIcon from '../../assets/statIcon1.svg';
import { APP_ROUTES } from '../../utils/Constants';
import { Link } from 'react-router-dom';
import { Stack, styled, Typography } from '@mui/material';
import bookImg from '../../assets/benefits/book.png';
import joystickImg from '../../assets/benefits/joystick.png';
import chartImg from '../../assets/benefits/chart.png';
import controllerImg from '../../assets/benefits/controller.png';

const StyledItem = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 300px;
  height: 200px;
  border-radius: 45px;
  box-shadow: 5px 5px 5px rgb(0 0 0 / 14%);
  background-color: #fff;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }

  @media (min-width: 600px) and (max-width: 900px) {
    width: 48%;
    margin-left: 0 !important;
  }
`;

const StyledStack = styled(Stack)`
  margin-bottom: 50px;

  @media (min-width: 600px) and (max-width: 900px) {
    flex-wrap: wrap;
    gap: 10px;
  }
`;

export function Benefits() {
  return (
    <section>
      <Typography sx={{ mb: 3 }} variant="h4">
        Давай начнем учиться
      </Typography>
      <StyledStack
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          textAlign: 'center',
        }}
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1}
        // direction={{ xs: 'column', sm: 'row' }}
        // spacing={{ xs: 2, sm: 2, md: 4 }}
      >
        <StyledItem>
          <img src={bookImg} alt="controller" />
          <Typography variant="h6">Учебник</Typography>
          <Typography variant="body1">Содержит более 3000 слов</Typography>
        </StyledItem>
        <StyledItem>
          <img src={controllerImg} alt="controller" />
          <Typography variant="h6">Спринт</Typography>
          <Typography variant="body1">Угадывай слова на время</Typography>
        </StyledItem>
        <StyledItem>
          <img src={joystickImg} alt="controller" />
          <Typography variant="h6">Аудиовызов</Typography>
          <Typography variant="body1">Угадай слово по звучанию</Typography>
        </StyledItem>
        <StyledItem>
          <img src={chartImg} alt="controller" />
          <Typography variant="h6">Статистика</Typography>
          <Typography variant="body1">Прогресс изучения</Typography>
        </StyledItem>
      </StyledStack>
    </section>
  );
}
