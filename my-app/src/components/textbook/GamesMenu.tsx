import * as React from 'react';
import { APP_ROUTES } from '../../utils/Constants';
import { Link } from 'react-router-dom';
import styles from './textbook.module.css'

export default function GamesMenu() {
    return (
        <ul className={styles.gamesMenu}>
                <li className={styles.gameItem}>
                    <Link to={APP_ROUTES.SPRINT} className={styles.gameLink}>Спринт</Link>
                </li>
                <li className={styles.gameItem}>
                    <Link to={APP_ROUTES.AUDIOCALL} className={styles.gameLink}>Аудиовызов</Link>
                </li>
        </ul>
    )
}
