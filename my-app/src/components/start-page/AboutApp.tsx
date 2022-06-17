import * as React from 'react';
import styles from './landing.module.css';
import topBanner from '../../assets/creative_minds.png';
import logoImg from '../../assets/rs-logo1.svg';

export class AboutApp extends React.Component {
  render() {
    return (
      <section className={styles.section + ' ' + styles.aboutSection}>
        <div className={styles.imgContainer}>
          <img className={styles.innerImg} src={topBanner} alt="app top banner" />
        </div>
        <div className={styles.logoCont}>
          <img className={styles.rsLogo} src={logoImg} alt="app-logo" />
          <h2 className={styles.mainTitle}>
            Приложение для изучения английского языка для пользователей разного уровня знаний
          </h2>
        </div>
      </section>
    );
  }
}
