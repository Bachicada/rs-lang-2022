import * as React from 'react';
import styles from './LoadingIcon.module.css'

export function LoadingIcon(){
    return (
        <div className={styles.wrapper}>
        <svg version="1.1"
        className={styles.cont}
        width="400" height="100"
        xmlns="http://www.w3.org/2000/svg">
      
     <circle cx="50" cy="50" r="50" className={styles.circle+' '+styles.red+' '+styles.one}/>
     <circle cx="150" cy="50" r="50" className={styles.circle+' '+styles.blue+' '+styles.two}/>
   
     <circle cx="150" cy="50" r="50" className={styles.circle+' '+styles.clear+' '+styles.four}/> 
     <circle cx="50" cy="50" r="50" className={styles.circle+' '+styles.red+' '+styles.three}/>
     

   </svg>
   <p className={styles.title}>loading...</p>
   </div>
    )
}

//https://codepen.io/JohnDBerman/pen/YzEWZZe