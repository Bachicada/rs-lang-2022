import React from 'react';
import ReactDOM from 'react-dom';
import Landing from '../start-page/Landing'
import Textbook from '../textbook/Textbook';
import Audiocall from '../audiocall/Audiocall';
import Sprint from '../sprint/Sprint';
import Stat from '../statistics/Stat';
import './../general.css'
import { APP_ROUTES } from '../../utils/Constants';
import { Link } from 'react-router-dom';

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
                <li className='menuItem'>
                    <Link to={APP_ROUTES.MAIN}>RS Lang</Link>
                </li>
                <li className='menuItem'>
                    <Link to={APP_ROUTES.TEXTBOOK}>Учебник</Link>
                </li>
                   <ul className='menuBook'>
                      <li className='bookItem'>
                         <Link to={`${APP_ROUTES.TEXTBOOK}${APP_ROUTES.PART1}`}>Раздел 1</Link>
                      </li>
                      <li className='bookItem'>
                         <Link to={`${APP_ROUTES.TEXTBOOK}${APP_ROUTES.PART2}`}>Раздел 2</Link>
                      </li>
                      <li className='bookItem'>
                         <Link to={`${APP_ROUTES.TEXTBOOK}${APP_ROUTES.PART3}`}>Раздел 3</Link>
                      </li>
                      <li className='bookItem'>
                         <Link to={`${APP_ROUTES.TEXTBOOK}${APP_ROUTES.PART4}`}>Раздел 4</Link>
                      </li>
                      <li className='bookItem'>
                         <Link to={`${APP_ROUTES.TEXTBOOK}${APP_ROUTES.PART5}`}>Раздел 5</Link>
                      </li>
                      <li className='bookItem'>
                         <Link to={`${APP_ROUTES.TEXTBOOK}${APP_ROUTES.PART6}`}>Раздел 6</Link>
                      </li>
                   </ul>
                <li className='menuItem'>
                    <Link to={APP_ROUTES.SPRINT}>Спринт</Link>
                </li>
                <li className='menuItem'>
                    <Link to={APP_ROUTES.AUDIOCALL}>Аудиовызов</Link>
                </li>
                <li className='menuItem'>
                    <Link to={APP_ROUTES.STATISTICS}>Статистика</Link>
                </li>
            </ul>
        )
    }
}