import * as React from 'react';
import styles from './landing.module.css';
import maryPic from '../../assets/maryPic.svg';
import timPic from '../../assets/timPic.svg';
import gitIcon from '../../assets/git-icon.png';

export class Team extends React.Component {
  render() {
    return (
      <section className="section aboutSection">
        <h2 className={styles.h2}>Команда разработчиков</h2>
        <div className={styles.profCardsCont}>
          <div className={styles.profCard}>
            <img className={styles.profPic} src={maryPic} alt="developer avatar" />
            <p className={styles.devName}>Мария Губа</p>
            <p className={styles.devStatus}>frontend developer</p>
            <p>Разработала:</p>
            <ul>
              <li>Главную страницу приложения</li>
              <li>Страницы Авторизации</li>
              <li>Компоненты Учебника</li>
            </ul>
            <div className={styles.gitLink}>
              <a
                className="footerLink"
                href="https://github.com/Bachicada"
                target="_blank"
                rel="noreferrer"
              >
                <span>bachicada</span>
                <img className={styles.gitIcon} src={gitIcon} />
              </a>
            </div>
          </div>
          <div className={styles.profCard}>
            <img className={styles.profPic} src={timPic} alt="developer avatar" />
            <p className={styles.devName}>Тимур Салихов</p>
            <p className={styles.devStatus}>Team leader, frontend developer</p>
            <p>Разработал:</p>
            <ul>
              <li>Мини-игру Спринт</li>
              <li>Мини-игру Аудиовызов</li>
              <li>Компоненты и логику Статистики</li>
            </ul>
            <div className={styles.gitLink}>
              <a
                className="footerLink"
                href="https://github.com/timursk"
                target="_blank"
                rel="noreferrer"
              >
                <span>timursk</span>
                <img className={styles.gitIcon} src={gitIcon} />
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
