import * as React from 'react';
import styles from './landing.module.css';



export class Benefits extends React.Component {
    render(){
     return (
         <section className={styles.section}>
                <h2>Как приложение помогает учиться:</h2>
                <div className={styles.benefitsList}>
                <ol className={styles.olcards}>
		           <li >
			          <div className={styles.content}>
				         <div className={styles.title}> Учебник</div>
				         <div className={styles.text}>Содержит более 3000 слов</div>
			         </div>
		           </li>
                   <li >
			          <div className={styles.content}>
				         <div className={styles.title}> Мини-игра "Спринт"</div>
				         <div className={styles.text}>Угадывай перевод слов на время</div>
			         </div>
		           </li>
                   <li >
			          <div className={styles.content}>
				         <div className={styles.title}> Мини-игра "Аудиовызов"</div>
				         <div className={styles.text}>Угадывай перевод слов по звучанию</div>
			         </div>
		           </li>
                   <li >
			          <div className={styles.content}>
				         <div className={styles.title}> Статистика</div>
				         <div className={styles.text}>Позволяет отслеживать прогресс изучения, определять сложные и изученные слова</div>
			         </div>
		           </li>
		      
	         </ol>
               
                </div>
         </section>
     )   
    }
} 