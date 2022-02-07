import * as React from 'react';
import '../general.css'
import gitIcon from '../../assets/git-icon.png';
import rsLogo from '../../assets/rs-logo.png'
import Box from '@mui/material/Box';

export function Footer() {
  return (
    <footer className='footer'>
        <span>2022</span>
        <a className='footerLink' href='https://github.com/timursk' target="_blank">
          <span>timursk</span>
          <img className='gitIcon' src={gitIcon} />
        </a>
        <a className='footerLink' href='https://github.com/Bachicada' target="_blank">
          <span>bachicada</span> 
          <img className='gitIcon' src={gitIcon}/>
        </a>
        <a className='footerLink' href='https://rs.school/' target="_blank">
           <img className='gitIcon' src={rsLogo}/>
        </a>
    </footer>
  );
}
