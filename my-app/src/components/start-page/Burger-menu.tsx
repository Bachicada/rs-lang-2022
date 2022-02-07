import React from 'react';
import ReactDOM from 'react-dom';
import Landing from './Landing'
import Textbook from '../textbook/Textbook';
import styles from './landing.module.css';
import Audiocall from '../audiocall/Audiocall';
import Sprint from '../sprint/Sprint';
import Stat from '../statistics/Stat';

export default class BurgerMenu extends React.Component {
    renderTextbook(){
        ReactDOM.render(
            <Textbook/>,
            document.getElementById('mainContainer')
          );
    }
    renderStartPage(){
        ReactDOM.render(
            <Landing/>,
            document.getElementById('mainContainer')
          );
    }
    renderAudioCall(){
        ReactDOM.render(
            <Audiocall/>,
            document.getElementById('mainContainer')
          );
    }
    renderSprint(){
        ReactDOM.render(
            <Sprint/>,
            document.getElementById('mainContainer')
          );
    }
    renderStat(){
        ReactDOM.render(
            <Stat/>,
            document.getElementById('mainContainer')
          );
    }

    render (){
        
        return (
            <ul className='menuList'>
                <li className={styles.menuItem} onClick={this.renderStartPage}>RS Lang</li>
                <li className={styles.menuItem} onClick={this.renderTextbook}>Учебник</li>
                   <ul className='menuBook'>
                      <li className={styles.bookItem}>Раздел 1</li>
                      <li className={styles.bookItem}>Раздел 2</li>
                      <li className={styles.bookItem}>Раздел 3</li>
                      <li className={styles.bookItem}>Раздел 4</li>
                      <li className={styles.bookItem}>Раздел 5</li>
                      <li className={styles.bookItem}>Раздел 6</li>
                   </ul>
                <li className={styles.menuItem} onClick={this.renderSprint}>Спринт</li>
                <li className={styles.menuItem} onClick={this.renderAudioCall}>Ауодивызов</li>
                <li className={styles.menuItem} onClick={this.renderStat}>Статистика</li>
            </ul>
        )
    }
}