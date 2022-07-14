import { Stack, styled, Typography } from '@mui/material';
import maryImg from '../../assets/illustrations/womanLaptopGraph.png';
import timImg from '../../assets/illustrations/manLaptopCropped.png';

const stackContent = [
  {
    img: timImg,
    name: 'Тимур Салихов',
    role: 'Teamlead, frontend developer',
    work: 'Разработал мини-игры спринт и аудиовызов, компоненты статистики, дизайн приложения',
  },
  {
    img: maryImg,
    name: 'Мария Губа',
    role: 'Frontend developer',
    work: 'Разработала страницы авторизации, компоненты учебника',
  },
];

export const Team = () => {
  return (
    <section>
      <Typography sx={{ marginBottom: '40px' }} variant="h4">
        Команда разработчиков
      </Typography>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ alignItems: 'center', justifyContent: 'space-around' }}
      >
        {stackContent.map(({ img, name, role, work }, idx) => (
          <StyledWrapper key={idx}>
            <StyledImg src={img} alt={name} />

            <Typography variant="h6">{name}</Typography>

            <Typography>{role}</Typography>

            <Typography sx={{ fontFamily: 'Roboto !important', padding: '0 5%' }}>
              {work}
            </Typography>
          </StyledWrapper>
        ))}
      </Stack>
    </section>
  );
};

const StyledWrapper = styled('div')`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 650px;
  height: 330px;
  border-radius: 50px;
  box-shadow: 5px 5px 5px rgb(0 0 0 / 14%);
  background-color: #ffffffd6;
  text-align: center;
`;

const StyledImg = styled('img')`
  width: 100%;
  max-width: 300px;
`;
