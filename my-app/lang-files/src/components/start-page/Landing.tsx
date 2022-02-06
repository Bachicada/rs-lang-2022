import * as React from 'react';
import styles from './landing.module.css';
import {AboutApp} from './AboutApp';
import {Benefits} from './Benefits';
import {Team} from './Team';

import { Styling } from '../../types';

export class Landing extends React.Component {
    render(){
     return (
       <div id='mainContainer' className={styles.landing} >
          <AboutApp />
          <Benefits />
          <Team />
       </div>
     )
    }
}