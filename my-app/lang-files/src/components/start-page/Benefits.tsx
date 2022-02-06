import * as React from 'react';
import styles from './landing.module.css';


export class Benefits extends React.Component {
    render(){
     return (
         <section className={styles.section +' '+styles.aboutSection}>
             <div>
                <h2>Study as You like:</h2>
             </div>
         </section>
     )   
    }
} 