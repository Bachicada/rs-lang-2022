import * as React from 'react';
import styles from './landing.module.css';
// import maryPic from '../../assets/maryPic.svg';
// import timPic from '../../assets/timPic.svg';
import gitIcon from '../../assets/git-icon.png';
import { Stack, styled, Typography } from '@mui/material';
import maryImg from '../../assets/illustrations/womanLaptopGraph.png';
import timImg from '../../assets/illustrations/manLaptop.png';

const StyledWrapper = styled('div')`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // width: 45%;
  width: 100%;
  max-width: 650px;
  height: 330px;
  border-radius: 50px;
  box-shadow: 5px 5px 5px rgb(0 0 0 / 14%);
  background-color: #ffffffd6;
  text-align: center;
`;

const StyledImg = styled('img')`
  // position: absolute;
  width: 100%;
  max-width: 300px;
  // transform: translateY(28%);
  // top: -20%;
`;

export class Team extends React.Component {
  render() {
    return (
      <section>
        <Typography sx={{ marginBottom: '40px' }} variant="h4">
          Команда разработчиков
        </Typography>
        <Stack
          // direction="row"
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ alignItems: 'center', justifyContent: 'space-around' }}
        >
          <StyledWrapper>
            <StyledImg src={timImg} alt="timur" />
            <Typography variant="h6">Тимур Салихов</Typography>
            <Typography>Teamlead, frontend developer</Typography>
            <Typography sx={{ fontFamily: 'Roboto !important', padding: '0 5%' }}>
              Разработал мини-игры спринт и аудиовызов, компоненты статистики, дизайн приложения
            </Typography>
          </StyledWrapper>
          <StyledWrapper>
            <StyledImg src={maryImg} alt="timur" />
            <Typography variant="h6">Мария Губа</Typography>
            <Typography>Frontend developer</Typography>
            <Typography sx={{ fontFamily: 'Roboto !important', padding: '0 5%' }}>
              Разработала страницы авторизации, компоненты учебника
            </Typography>
          </StyledWrapper>
        </Stack>
      </section>
      // <section className="section aboutSection">
      //   <h2 className={styles.h2}>Команда разработчиков</h2>
      //   <div className={styles.profCardsCont}>
      //     <div className={styles.profCard}>
      // {/* <img className={styles.profPic} src={maryPic} alt="developer avatar" /> */}
      //       <p className={styles.devName}>Мария Губа</p>
      //       <p className={styles.devStatus}>frontend developer</p>
      //       <p>Разработала:</p>
      //       <ul>
      //         <li>Главную страницу приложения</li>
      //         <li>Страницы Авторизации</li>
      //         <li>Компоненты Учебника</li>
      //       </ul>
      //       <div className={styles.gitLink}>
      //         <a
      //           className="footerLink"
      //           href="https://github.com/Bachicada"
      //           target="_blank"
      //           rel="noreferrer"
      //         >
      //           <span>bachicada</span>
      //           <img className={styles.gitIcon} src={gitIcon} />
      //         </a>
      //       </div>
      //     </div>
      //     <div className={styles.profCard}>
      //       <img className={styles.profPic} src={timPic} alt="developer avatar" />
      //       <p className={styles.devName}>Тимур Салихов</p>
      //       <p className={styles.devStatus}>Team leader, frontend developer</p>
      //       <p>Разработал:</p>
      //       <ul>
      //         <li>Мини-игру Спринт</li>
      //         <li>Мини-игру Аудиовызов</li>
      //         <li>Компоненты и логику Статистики</li>
      //       </ul>
      //       <div className={styles.gitLink}>
      //         <a
      //           className="footerLink"
      //           href="https://github.com/timursk"
      //           target="_blank"
      //           rel="noreferrer"
      //         >
      //           <span>timursk</span>
      //           <img className={styles.gitIcon} src={gitIcon} />
      //         </a>
      //       </div>
      //     </div>
      //   </div>
      // </section>
    );
  }
}
