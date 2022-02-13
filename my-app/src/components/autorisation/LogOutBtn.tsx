import * as React from 'react';
import styles from './Autorisation.module.css';
import { USERSTATE } from '../../utils/Constants';

export default function LogOutBtn(){
    function logOut(){
        localStorage.clear();
        USERSTATE.ISLOGED = false;
        console.log(USERSTATE)
    }
    return (
        <button  className={styles.signInBtn} onClick={()=>logOut()}>Выйти</button>
    )
}