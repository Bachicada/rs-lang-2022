import * as React from 'react';
import { APP_ROUTES } from '../../utils/Constants';
import { Link, useParams } from 'react-router-dom';
import styles from './textbook.module.css'
import Utils from '../../utils/Utils';

export default function GamesMenu() {
  const params = useParams<{ part: string; page: string }>();
  Utils.setParams(params);
  
    return (
        <div className={styles.gamesBlock}>
            <h3>Проверь свои знания, играя:</h3>
            <ul className={styles.gamesMenu}>
                <li className={styles.gameItem}>
                    <Link to={APP_ROUTES.SPRINT} className={styles.gameLink}>Спринт</Link>
                </li>
                <li className={styles.gameItem}>
                    <Link to={APP_ROUTES.AUDIOCALL} className={styles.gameLink}>Аудиовызов</Link>
                </li>
            </ul>
        </div>
    )
}
