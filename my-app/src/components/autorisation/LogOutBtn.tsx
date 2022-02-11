import * as React from 'react';
import styles from './Autorisation.module.css';

export default function LogOutBtn(){
    function logOut(){
        localStorage.clear();
    }
    return (
        <button  className={styles.signInBtn} onClick={()=>logOut()}>Выйти</button>
    )
}