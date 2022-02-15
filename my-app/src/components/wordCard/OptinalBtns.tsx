import * as React from 'react';
import styles from './WordCard.module.css'


export default function OprionalBtns(){
    return (
        <div>
           	<label className={styles.label}>
		      <input className={styles.inputBtn+' '+styles.hardBtn}type="checkbox"/>
		       <span className={styles.spanBtn}> Сложное </span>
	        </label>
            <label className={styles.label}>
		      <input className={styles.inputBtn+' '+styles.learnedBtn}type="checkbox"/>
		       <span className={styles.spanBtn}> Изученное </span>
	        </label>
        </div>
    )
}