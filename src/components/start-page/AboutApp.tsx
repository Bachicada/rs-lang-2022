import * as React from 'react';
import styles from './landing.module.css';
import topBanner from '../../assets/creative_minds.png'


export class AboutApp extends React.Component {
    render(){
     return (
         <section className={styles.section+' '+styles.aboutSection}>
              <div className={styles.imgContainer}>
                 <img className={styles.innerImg} src={topBanner}/>
             </div>
             <div>
                <h1>RS LANG</h1>
                <span>Icrease your English knowledge</span>
             </div>
            
         </section>
     )   
    }
}