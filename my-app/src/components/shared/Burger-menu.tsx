import React, { SyntheticEvent, useContext } from 'react';
import './../general.css'
import { APP_ROUTES } from '../../utils/Constants';
import { Link, useNavigate } from 'react-router-dom';
import { CurUser } from '../../types';
import { UserContext } from '../../App';

export default function BurgerMenu() {
    const navigate= useNavigate();
    
    const userContext = useContext<{ user: CurUser; dispatchUserEvent: (actionType: string, payload: CurUser) => void; }>(
        UserContext
      );

    function checkNavigation(event: SyntheticEvent){
        const target = (event.target as HTMLElement).dataset.part;
        const partNumber = (Number(target) - 1).toString();
        navigate(`${APP_ROUTES.TEXTBOOK}/${partNumber}/0`)
    }

        return (
            <ul className='menuList'>
                <li className='menuItem'>
                    <Link to={APP_ROUTES.MAIN}>RS Lang</Link>
                </li>
                <li className='menuItem'>
                    <Link to={`${APP_ROUTES.TEXTBOOK}/0`}>Учебник</Link>
                </li>
                   <ul className='menuBook' 
                   onClick={(event)=> checkNavigation(event)}>
                      <li className='bookItem' data-part='1'>
                         Раздел 1
                      </li>
                      <li className='bookItem' data-part='2'>
                         Раздел 2
                      </li>
                      <li className='bookItem' data-part='3'>
                         Раздел 3
                      </li>
                      <li className='bookItem' data-part='4'>
                         Раздел 4
                      </li>
                      <li className='bookItem' data-part='5'>
                         Раздел 5
                      </li>
                      <li className='bookItem' data-part='6'>
                         Раздел 6
                      </li>
                      {userContext.user.name ? 
                      <li className='bookItem' data-part='7'>
                         Сложные слова
                      </li> :
                      ''
                      }
                      {userContext.user.name ? 
                      <li className='bookItem' data-part='8'>
                         Изученные слова
                      </li> :
                      ''
                    }
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