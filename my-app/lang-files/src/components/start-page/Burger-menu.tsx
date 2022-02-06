import React from 'react';
import ReactDOM from 'react-dom';
import Textbook from '../textbook/Textbook'

export default class BurgerMenu extends React.Component {
    renderTextbook(){
        ReactDOM.render(
            <Textbook/>,
            document.getElementById('mainContainer')
          );
    }

    render (){
        
        return (
            <ul className='menuList'>
                <li className='menuItem' onClick={this.renderTextbook}>Учебник</li>
                   <ul className='menuBook'>
                      <li className='bookItem'>Раздел 1</li>
                      <li className='bookItem'>Раздел 2</li>
                      <li className='bookItem'>Раздел 3</li>
                      <li className='bookItem'>Раздел 4</li>
                      <li className='bookItem'>Раздел 5</li>
                      <li className='bookItem'>Раздел 6</li>
                   </ul>
                <li className='menuItem'>Спринт</li>
                <li className='menuItem'>Ауодивызов</li>
                <li className='menuItem'>Статистика</li>
            </ul>
        )
    }
}