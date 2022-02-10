import React from 'react';
import './../general.css'
import { APP_ROUTES } from '../../utils/Constants';
import { Link } from 'react-router-dom';

export default class BurgerMenu extends React.Component {
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