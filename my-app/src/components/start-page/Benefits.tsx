import * as React from 'react';
import { useNavigate } from 'react-router-dom';
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
  background-color: #ffffffd6;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #f5f5f5d6;
    transform: scale(1.1);
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

const stackContent = [
  { img: bookImg, title: 'Учебник', subtitle: 'Содержит более 3000 слов', link: '/textbook/0/1' },
  { img: controllerImg, title: 'Спринт', subtitle: 'Угадывай слова на время', link: '/sprint' },
  { img: joystickImg, title: 'Аудиовызов', subtitle: 'Слово по звучанию', link: '/audiocall' },
  { img: chartImg, title: 'Статистика', subtitle: 'Прогресс изучения', link: '/statistics' },
];

export function Benefits() {
  const navigate = useNavigate();

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
      >
        {stackContent.map(({ img, title, subtitle, link }, idx) => (
          <StyledItem key={idx} onClick={() => navigate(link)}>
            <img src={img} alt="controller" />

            <Typography variant="h6">{title}</Typography>

            <Typography variant="body1">{subtitle}</Typography>
          </StyledItem>
        ))}
      </StyledStack>
    </section>
  );
}
