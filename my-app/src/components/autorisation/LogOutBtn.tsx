import * as React from 'react';
import styles from './autorisation.module.css';
import { UserContext } from '../../App';
import { CurUser } from '../../types';
import { useContext } from 'react';

export default function LogOutBtn(){
    const { dispatchUserEvent } = useContext<{
        user: CurUser;
        dispatchUserEvent: (actionType: string, payload: CurUser) => void;
      }>(UserContext);
      
    function logOut(){
        localStorage.clear();
        dispatchUserEvent("CLEAR_USER", {});
    }
    return (
        <button className={styles.signInBtn} onClick={()=>logOut()}>Выйти</button>
    )
}