import * as React from 'react';
import styles from './landing.module.css';
import { AboutApp } from './AboutApp';
import { Benefits } from './Benefits';
import { Team } from './Team';

export default function Landing() {
  return (
    <div className={styles.landing}>
      <AboutApp />
      {/* <Benefits /> */}
      <Team />
    </div>
  );
}
