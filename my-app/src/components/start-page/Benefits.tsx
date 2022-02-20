import * as React from 'react';
import styles from './landing.module.css';
import textbookIcon from '../../assets/textbookIcon1.svg'
import sprintIcon from '../../assets/sprintIcon.svg';
import audioIcon from '../../assets/audioIcon.svg'
import statIcon from '../../assets/statIcon1.svg'
import { APP_ROUTES } from '../../utils/Constants';
import { Link } from 'react-router-dom';


export function Benefits() {
     return (
         <section className={styles.section}>
                <h2 className={styles.h2}>Как приложение помогает учиться:</h2>
            
                <ol className={styles.olcards}>
		           <li >
			            <div className={styles.content}>
						   <Link className={styles.linkItem} to={`${APP_ROUTES.TEXTBOOK}/0`}>
					          <div className={styles.icon}><img className={styles.innerIcon} src={textbookIcon}/> </div>
						      <div>
				                  <div className={styles.title}>Учебник</div>
				                  <div className={styles.text}>Содержит более 3000 слов</div>
						      </div>
						   </Link>
			            </div>
		           </li>
                   <li >
			          <div className={styles.content}>
					  <Link className={styles.linkItem} to={`${APP_ROUTES.SPRINT}`}>
					     <div className={styles.icon}><img className={styles.innerIcon} src={sprintIcon}/> </div>
						 <div>
				             <div className={styles.title}>Мини-игра "Спринт"</div>
				             <div className={styles.text}>Угадывай перевод слов на время</div>
						 </div>
						</Link> 
			         </div>
		           </li>
                   <li >
			           <div className={styles.content}>
					   <Link className={styles.linkItem} to={`${APP_ROUTES.AUDIOCALL}`}>
					     <div className={styles.icon}><img className={styles.innerIcon} src={audioIcon}/> </div>
						 <div>
				             <div className={styles.title}>Мини-игра "Аудиовызов"</div>
				             <div className={styles.text}>Угадывай перевод слов по звучанию</div>
						 </div>
						 </Link>
			         </div>
		           </li>
				   <li >
			          <div className={styles.content}>
					  <Link className={styles.linkItem} to={`${APP_ROUTES.STATISTICS}`}>
					     <div className={styles.icon}><img className={styles.innerIcon} src={statIcon}/> </div>
						 <div>
				             <div className={styles.title}>Статистика</div>
				             <div className={styles.text}>Позволяет отслеживать прогресс изучения, определять сложные и изученные слова</div>
						 </div>
						</Link>
			         </div>
		           </li>
	         </ol>
         </section>
     )   
    }
