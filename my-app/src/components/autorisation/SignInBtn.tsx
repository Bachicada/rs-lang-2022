import * as React from 'react';
import styles from './autorisation.module.css'
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../../utils/Constants';

export function SignInBtn(){
    return <button className={styles.signInBtn}> <Link to={APP_ROUTES.SIGNIN}>Войти</Link></button>
}